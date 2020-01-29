const ejs = require('ejs');

const { camalize } = require('../../utils/str');

function objectionModelRepositoryGeneratorFromSql(modelName, tableName, tableFields) {
    return ejs.renderFile(__dirname+'/stubs/repository/objectionRepositoryStub.ejs', {
      modelName,
    });
  }

module.exports = {
    objectionModelRepositoryGeneratorFromSql
}