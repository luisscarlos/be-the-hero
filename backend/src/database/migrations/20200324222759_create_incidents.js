
exports.up = function(knex) { 
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); // chave primária autoincremental

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    // chave estrangeria para pegar a id da table ongs
    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) { 
  return knex.schema.dropTable('incidents'); // deleta a table ongs
};
