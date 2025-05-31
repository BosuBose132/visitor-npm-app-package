function normalize(text) {
  return text ? text.trim().toLowerCase() : '';
}

async function isDuplicateVisitor(data, db) {
  const name = normalize(data.name);
  const company = normalize(data.company);

  console.log('[isDuplicateVisitor] Checking:', name, company);

  const match = await db.findOneAsync({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    company: { $regex: new RegExp(`^${company}$`, 'i') }
  });

  console.log('[isDuplicateVisitor] Match Found:', match);
  return match;
}

async function checkAndCreateVisitor(data, db) {
  console.log('[checkAndCreateVisitor] Received:', data);

  const existing = await isDuplicateVisitor(data, db);
  if (existing) {
    console.log('[checkAndCreateVisitor] Duplicate found');
    return { status: 'duplicate', visitor: existing };
  }

  const _id = await db.insertAsync({ ...data, createdAt: new Date() });
  console.log('[checkAndCreateVisitor] Inserted ID:', _id);

  return { status: 'created', _id };
}

module.exports = {
  checkAndCreateVisitor
};
