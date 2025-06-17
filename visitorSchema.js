// visitorSchema.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String },
  purpose: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);
module.exports = Visitor;
