const { createVisitor, getVisitorInfo } = require('./index');

const visitor = createVisitor({ name: 'Bosu Bade', email: 'bosu@example.com' });
console.log(visitor);

const info = getVisitorInfo('12345');
console.log(info);
