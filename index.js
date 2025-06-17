console.log('🟢 index.js is loaded!');

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');        
const { visitorSchema } = require('./visitorSchema');
const validatePatient = require('./validateFhirPatient');
const transformToFhir = require('./transformToFhir');




const ajv = new Ajv();
addFormats(ajv)
const schemaPath = path.join(__dirname, 'visitorSchema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const validateSchema = ajv.compile(schema);

function normalize(text) {
  return text ? text.trim().toLowerCase() : '';
}

function validateVisitor(data) {
  const valid = validateSchema(data);
  if (!valid) {
    const errors = validateSchema.errors.map(e => `${e.instancePath} ${e.message}`).join(', ');
    throw new Error(`Validation failed: ${errors}`);
  }
}

function isMongooseModel(db) {
  return typeof db.findOne === 'function' && typeof db.create === 'function';
}

async function isDuplicateVisitor(data, db) {
  const name = normalize(data.name);
  const company = normalize(data.company);

  const query = {
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    company: { $regex: new RegExp(`^${company}$`, 'i') }
  };

  return isMongooseModel(db)
    ? await db.findOne(query)
    : await db.findOneAsync(query);
}

async function checkAndCreateVisitor(data, db) {
  validateVisitor(data); // JSON Schema validation
console.log('>>> Reached FHIR transformation step');

  // Transform visitor data into FHIR format
  const fhirData = transformToFhir(data);

  // 🔍 Debug: Print transformed FHIR data
  console.log('Transformed FHIR Data:', JSON.stringify(fhirData, null, 2));

  // Validate FHIR structure
  try {
    validatePatient(fhirData);
    console.log('✅ FHIR Patient validation passed.');
  } catch (error) {
    console.error('❌ FHIR Patient validation failed:', error.message);
  }

  // Duplicate check logic
  const existing = await isDuplicateVisitor(data, db);
  if (existing) {
    return { status: 'duplicate', visitor: existing };
  }

  const newVisitor = {
    ...data,
    createdAt: new Date()
  };

  if (isMongooseModel(db)) {
    const created = await db.create(newVisitor);
    return { status: 'created', _id: created._id };
  } else {
    const _id = await db.insertAsync(newVisitor);
    return { status: 'created', _id };
  }
}




module.exports = {
  checkAndCreateVisitor
};
