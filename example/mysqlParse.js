const parser = require('../parsers/mysql/parser');

const sql = require('fs').readFileSync(__dirname +'/db.sql', 'utf-8');
const parsedSQL = parser.parse(sql);

console.log(JSON.stringify(parsedSQL, null, 2));
