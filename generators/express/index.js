const { expressRoutesGeneratorFromSql } = require('./expressRoutesGeneratorFromSql');
const { generateKnexMigrationFromSql } = require('./knexMigrationGenerator');
const { generateObjectionModelFromSql } = require('./objectionModelGenerator');
const { objectionModelRepositoryGeneratorFromSql } = require('./objectionModelRepositoryGenerator');

module.exports = {
    expressRoutesGeneratorFromSql,
    generateKnexMigrationFromSql,
    generateObjectionModelFromSql,
    objectionModelRepositoryGeneratorFromSql
};