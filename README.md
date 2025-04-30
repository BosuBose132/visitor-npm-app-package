# Visitor NPM App

Simple visitor management starter package for Meteor.js integration.

## Usage

```javascript
const { createVisitor, getVisitorInfo } = require('visitor-npm-app');

const visitor = createVisitor({ name: 'Alice', email: 'alice@example.com' });
console.log(visitor);

const info = getVisitorInfo('12345');
console.log(info);
