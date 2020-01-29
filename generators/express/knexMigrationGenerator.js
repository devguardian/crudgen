const ejs = require('ejs');

function knexSchemaBuilder(sqlField) {
    let knexTable = `table`;
    let type = sqlField.type.type_name.toLowerCase();
  
    if(sqlField.increment) {
      knexTable+=`.increments('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('varchar')) {
      knexTable+=`.string('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('int')) {
      knexTable+=`.integer('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('boolean')) {
      knexTable+=`.boolean('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('date')) {
      knexTable+=`.date('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('time')) {
      knexTable+=`.time('${sqlField.name}', ${sqlField.type.args})`;
    } else if(type.startsWith('double')) {
      knexTable+=`.double('${sqlField.name}', ${sqlField.type.args})`;
    } else {
      knexTable+=`.specificType('${sqlField.name}', '${sqlField.type.type_name}')`
    }
  
    if(sqlField.not_null) knexTable += '.notNullable()';
    else knexTable +='.nullable()';
  
    if(sqlField.pk) knexTable +='.primary()';
    if(sqlField.unique) knexTable +='.unique()';
  
    return knexTable+';';
}


function generateKnexMigrationFromSql(tableName, tableFields) {
    return ejs.renderFile(__dirname+'/stubs/migration/knexMigrationCreateTable.ejs', {
      tableName,
      tableFields,
      knexSchemaBuilder,
    });
  }

module.exports = {
    knexSchemaBuilder,
    generateKnexMigrationFromSql
}