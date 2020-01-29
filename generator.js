const fs = require('fs');
const pluralize = require('pluralize');

const {     
  expressRoutesGeneratorFromSql,
  generateKnexMigrationFromSql,
  generateObjectionModelFromSql,
  objectionModelRepositoryGeneratorFromSql,
} = require('./generators/express');

const ast = fs.readFileSync('./parsed.json', 'utf-8');

function toPascalCase(string) {
  return `${string}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}

function camalize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}


JSON.parse(ast).tables.forEach(table => {
  const modelName = toPascalCase(pluralize.singular(table.name));

  generateKnexMigrationFromSql(table.name, table.fields)
    .then((str) => {
      fs.writeFileSync(`generated/migrations/migration-${table.name}.js`, str);
    });

  generateObjectionModelFromSql(modelName, table.name, table.fields)
    .then(str => {
      fs.writeFileSync(`generated/models/${modelName}.js`, str);
    });

  expressRoutesGeneratorFromSql(modelName, table.name, table.fields)
    .then(str => {
      fs.writeFileSync(`generated/routes/${camalize(table.name)}Routes.js`, str);
    });

  objectionModelRepositoryGeneratorFromSql(modelName, table.name, table.fields)
    .then(str => {
      fs.writeFileSync(`generated/repositories/${modelName}Respository.js`, str);
    });
});
