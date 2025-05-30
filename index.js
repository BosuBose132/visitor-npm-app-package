function normalize(text) {
  return text.trim().toLowerCase();
}

function validateVisitor(data) {
  if (!data.name || !data.company) {
    throw new Error('Missing required visitor fields.');
  }
}

function isDuplicateVisitor(data, db) {
  const name = normalize(data.name);
  const company = normalize(data.company);

  return db.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    company: { $regex: new RegExp(`^${company}$`, 'i') }
  });
}

function checkAndCreateVisitor(data, db) {
  validateVisitor(data);

  const existing = isDuplicateVisitor(data, db);
  if (existing) {
    return { status: 'duplicate', visitor: existing };
  }

  const _id = db.insert({ ...data, createdAt: new Date() });
  return { status: 'created', _id };
}

module.exports = {
  checkAndCreateVisitor
};
