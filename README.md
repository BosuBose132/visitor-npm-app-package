
# visitor-npm-app

A lightweight, developer-friendly Node.js package to streamline visitor check-ins with powerful validation, duplicate prevention, and MongoDB/Mongoose support. Ideal for integration with **Meteor.js**, **Express**, or any **Node.js** backend.

---

## ✨ Features

- ✅ Validates required fields (`name`, `company`) using **AJV** and **JSON Schema**
- 🧠 Normalizes input (trims + lowercases) to avoid false duplicates
- 🔁 Prevents duplicates via case-insensitive matching
- 🗃️ Adds `createdAt` timestamp for new visitors
- 🔗 Works with both **raw MongoDB collections** and **Mongoose models**
- ⚙️ Supports structured validation with `visitorSchema.json`
- 📦 Modular and easy to use in any JavaScript project

---

## 🚀 Installation

Install from npm:

```bash
npm install visitor-npm-app


## 🚀 Usage

const { checkAndCreateVisitor } = require('visitor-npm-app');
const Visitors = require('./models/Visitors'); // Mongoose model or raw collection

const data = {
  name: 'John Doe',
  company: 'OpenAI',
  email: 'john@example.com',
  purpose: 'Meeting'
};

const result = await checkAndCreateVisitor(data, Visitors);
console.log(result);


## 🧾 Output
// If visitor already exists
{
  "status": "duplicate",
  "visitor": {
    "name": "John Doe",
    "company": "OpenAI",
    ...
  }
}

// If new visitor is created
{
  "status": "created",
  "_id": "uniqueId123"
}


## mongoose Schema Integration

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  email: String,
  purpose: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);


```

## 🧪 Example Use in Meteor

Inside a Meteor method:

Meteor.methods({
  async 'visitors.checkIn'(data) {
    return await checkAndCreateVisitor(data, Visitors); // Supports MongoDB or Mongoose
  }
});

## JSON Schema Validation

{
  "type": "object",
  "required": ["name", "company"],
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "company": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "purpose": { "type": "string" },
    "createdAt": { "type": "string", "format": "date-time" }
  },
  "additionalProperties": false
}


```

## 🧑‍💻 Author

**Bosu Babu Bade**

Made with ❤️ for a next-gen Visitor Management System using Meteor.js, Raspberry Pi, OCR, and facial recognition integrations.

## 📄 License

MIT
