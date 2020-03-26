
exports.up = function(knex) { // O método up é responsável pela criação da tabela
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) { // caso dê algum problema na criação da tabela, executa algo
  return knex.schema.dropTable('ongs'); // deleta a table ongs
};
