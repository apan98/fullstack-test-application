exports.up = function(knex) {
    return knex.schema.createTable('link', function(table) {
        table.increments();
        table.string('url').notNullable();
        table.timestamps('created_at');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};