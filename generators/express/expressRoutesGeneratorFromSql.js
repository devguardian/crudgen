const ejs = require('ejs');


function validationRuleBuilder(sqlField) {
  let rule = ``;
  let type = sqlField.type.type_name.toLowerCase();

  if(sqlField.increment) {
    return null;
  } else if(sqlField.pk) {
    return null;
  } else {
    rule+=`check('${sqlField.name}').trim()`;
  }
  
  if(type.startsWith('varchar')) {
    rule+=``;
  } else if(type.startsWith('int')) {
    rule+=`.isInt()`;
  } else if(type.startsWith('boolean')) {
    rule+=``;
  } else if(type.startsWith('date')) {
    rule+=`.isISO8601().toDate()`;
  } else if(type.startsWith('time')) {
    rule+=``;
  } else if(type.startsWith('double')) {
    rule+=``;
  }

  if(sqlField.not_null) rule += '.exists({checkFalsy: true}).not().isEmpty()';
  else rule +='.not().isEmpty().optional()';


  return rule+",";
}

function expressRoutesGeneratorFromSql(modelName, tableName, tableFields) {
  return ejs.renderFile(__dirname+'/stubs/routes/crudApiRoutes.ejs', {
    modelName,
    tableName,
    tableFields,
    validationRuleBuilder
  });
}

module.exports = {
  expressRoutesGeneratorFromSql
};