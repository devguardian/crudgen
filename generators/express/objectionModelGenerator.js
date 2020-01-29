const ejs = require('ejs');

const { camalize } = require('../../utils/str');

function objectionModelSchemaGenerator(sqlField) {
    let schema = `${sqlField.name}: `;
    let type = sqlField.type.type_name.toLowerCase();
  
    if(sqlField.increment) {
      schema+=`{type: 'number'}`;
    } else if(type.startsWith('varchar')) {
      schema+=`{type: 'string'}`;
    } else if(type.startsWith('int')) {
      schema+=`{type: 'number'}`;
    } else if(type.startsWith('boolean')) {
      schema+=`{type: 'boolean'}`;
    } else if(type.startsWith('date')) {
      schema+=`{type: 'date'}`;
    } else if(type.startsWith('time')) {
      schema+=`{type: 'time'}`;
    } else if(type.startsWith('double')) {
      schema+=`{type: 'double'}`;
    }
  
    return schema + ",";
}


function generateObjectionModelFromSql(modelName, tableName, tableFields) {
    return ejs.renderFile(__dirname+'/stubs/models/objectionModel.ejs', {
      modelName,
      tableName,
      tableFields,
      camalize,
      objectionModelSchemaGenerator,
    });
  }

module.exports = {
    objectionModelSchemaGenerator,
    generateObjectionModelFromSql
}