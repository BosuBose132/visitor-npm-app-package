const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const fhirPath = path.join(__dirname, 'fhirPatientSchema.json');
const fhirSchema = JSON.parse(fs.readFileSync(fhirPath, 'utf-8'));
const validateFhirPatient = ajv.compile(fhirSchema);

function validatePatient(data) {
  const isValid = validateFhirPatient(data);
  if (!isValid) {
    const errorMessages = validateFhirPatient.errors.map(
      err => `${err.instancePath} ${err.message}`
    ).join(', ');
    console.log('❌ FHIR Validation Error:', errorMessages);
    throw new Error(`FHIR Validation failed: ${errorMessages}`);
  } else {
    console.log('✅ FHIR validation passed');
  }
}

module.exports = validateFhirPatient;
