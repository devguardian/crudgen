const parser = require('../parsers/mysql/parser');

const sql = require('fs').readFileSync('./db.sql', 'utf-8');
const ast = parser.parse(sql);

console.log(JSON.stringify(ast, null, 2));
