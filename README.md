
# visitor-npm-app

A minimal and developer-friendly Node.js package for managing visitor entries in a MongoDB-based system. Designed to integrate seamlessly with **Meteor.js**, **Express**, or any **Node.js** backend. Now enhanced with **Mongoose schema support** for robust validation and structure.

---

## ✨ Features

- ✅ Validates required visitor fields (`name`, `company`)
- 🧠 Normalizes data (trims and lowercases) to avoid false duplicates
- 🔁 Checks for duplicates using case-insensitive matching
- 🗃️ Inserts new visitors with a `createdAt` timestamp
- 📋 Returns structured status response (`created` or `duplicate`)
- ⚙️ Mongoose schema support for easy integration with structured MongoDB models
- 📦 Lightweight, modular, and reusable in any JS project

---

## 🚀 Installation

If published to npm:

```bash
npm install visitor-npm-app

## 🚀 Usage

const { checkAndCreateVisitor } = require('visitor-npm-app');
const Visitors = require('./models/Visitors'); // A Mongoose model or raw Mongo collection

const data = {
  name: 'John Doe',
  company: 'OpenAI',
  email: 'john@example.com',
  purpose: 'Meeting'
};

const result = await checkAndCreateVisitor(data, Visitors);
console.log(result);

```

## 🧾 Output
// If visitor already exists
{
  status: 'duplicate',
  visitor: { name: 'John Doe', company: 'OpenAI', ... }
}

// If new visitor is created
{
  status: 'created',
  _id: 'uniqueId123'
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
  async 'visitor.create'(data) {
    return await checkAndCreateVisitor(data, Visitors); // Mongo/Mongoose compatible
  }
});

```

## 🧑‍💻 Author

**Bosu Babu Bade**

Made with ❤️ for a next-gen Visitor Management System using Meteor.js, Raspberry Pi, OCR, and facial recognition integrations.

## 📄 License

MIT
