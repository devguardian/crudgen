const fs = require('fs');
const pluralize = require('pluralize');
const program = require('commander');
const parser = require('./parsers/mysql/parser');
const { toPascalCase, camalize } = require('./utils/str');
const {
  expressRoutesGeneratorFromSql,
  generateKnexMigrationFromSql,
  generateObjectionModelFromSql,
  objectionModelRepositoryGeneratorFromSql,
} = require('./generators/express');

program.version('0.0.1');

program
  .option('--file [sql]', 'sql file')

program.parse(process.argv);

if (!program.file) throw Error("--file needs a valid sql file");

const sql = fs.readFileSync(__dirname+"/"+program.file, 'utf-8');
const ast = parser.parse(sql);

fs.mkdirSync('generated/migrations', { recursive: true });
fs.mkdirSync('generated/routes', { recursive: true });
fs.mkdirSync('generated/models', { recursive: true });
fs.mkdirSync('generated/repositories', { recursive: true });


ast.tables.forEach(table => {
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
      fs.writeFileSync(`generated/repositories/${modelName}Repository.js`, str);
    });
});
