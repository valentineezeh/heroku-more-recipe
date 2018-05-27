'use strict';

module.exports = {
  development: {
    username: 'postgres',
    password: 'Sagemode2',
    database: 'work',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Sagemode2',
    database: 'more-recipe-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variables: 'DATABASE_URL',
    dialect: 'postgres'
  }
};