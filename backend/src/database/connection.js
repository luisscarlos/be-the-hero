const knex = require('knex');
const configuration = require ('../../knexfile');

// o NODE_ENV é uma variável ambiente usado para conexão com o banco de dados de teste
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
// se essa variável for text, usa o configuration.test do arquivo 'knexfile.js', senão usa development

const connection = knex(config);

module.exports = connection;