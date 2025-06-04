const { visitorSchema } = require('./visitorSchema');

function normalize(text) {
  return text ? text.trim().toLowerCase() : '';
}

function validateVisitor(data) {
  if (!data.name || !data.company) {
    throw new Error('Missing required visitor fields.');
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
  validateVisitor(data);

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
