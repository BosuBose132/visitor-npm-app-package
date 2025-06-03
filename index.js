require('./connect');
const mongoose = require('mongoose');
const Visitor = require('./visitorSchema'); // Make sure the path is correct

function normalize(text) {
  return text ? text.trim().toLowerCase() : '';
  return text ? text.trim().toLowerCase() : '';
}

function validateVisitor(data) {
  if (!data.name || !data.company) {
    throw new Error('Missing required visitor fields.');
  }
}

async function checkAndCreateVisitor(data) {
  validateVisitor(data);

  const name = normalize(data.name);
  const company = normalize(data.company);

  const existing = await Visitor.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') },
    company: { $regex: new RegExp(`^${company}$`, 'i') },
  });

  if (existing) {
    console.log('[checkAndCreateVisitor] Duplicate found');
    return { status: 'duplicate', visitor: existing };
  }

  const newVisitor = new Visitor({
    ...data,
    createdAt: new Date()
  });

  await newVisitor.save();
  return { status: 'created', _id: newVisitor._id };
}

module.exports = {
  checkAndCreateVisitor
};
