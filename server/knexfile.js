module.exports = {
  development: {
    client: 'mysql',
    connection: {
      port: 3306,
      host : 'localhost', // or 'db' if you're using the docker-compose
      user : 'user',
      password : 'password', // use your own password
      database : 'test' // use your own database name
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    }
  }
};