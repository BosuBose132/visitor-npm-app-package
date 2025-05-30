
# visitor-npm-app

A minimal Node.js package for managing visitor entries in a MongoDB-based system, designed to be integrated with Meteor.js or any Node.js-based app.

## 🔧 Features
- ✅ Validates required visitor fields (`name`, `company`)
- ✅ Checks for duplicates using case-insensitive name and company match
- ✅ Inserts new visitors with a `createdAt` timestamp
- ✅ Returns structured status response (`created` or `duplicate`)

## 📦 Installation

If you are developing locally using `npm link`:

```bash
npm link
# In your Meteor or Node.js project:
npm link visitor-npm-app
```

## 🚀 Usage

```js
const { checkAndCreateVisitor } = require('visitor-npm-app');

const data = {
  name: 'John Doe',
  company: 'OpenAI'
};

// 'Visitors' is a MongoDB collection
const result = checkAndCreateVisitor(data, Visitors);

console.log(result);
```

## 🧾 Output

```js
// If visitor already exists
{ status: 'duplicate', visitor: { ... } }

// If visitor is new
{ status: 'created', _id: '...' }
```

## 🧪 Example Use in Meteor

Inside a Meteor method:

```js
Meteor.methods({
  'visitor.create'(data) {
    return checkAndCreateVisitor(data, Visitors);
  }
});
```

## 🧑‍💻 Author

**Bosu Babu Bade**

Made with ❤️ for a next-gen Visitor Management System using Meteor.js, Raspberry Pi, OCR, and facial recognition integrations.

## 📄 License

MIT
