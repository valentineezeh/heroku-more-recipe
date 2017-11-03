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
    username: 'tfasxalepioaln',
    password: '0d41dc6bb68407bb82cdaa68e924963ff26db15ec16459d7d9c74aa480cd87f2',
    database: 'dfsm6g9e0ieuir',
    host: 'ec2-54-235-150-134.compute-1.amazonaws.com',
    dialect: 'postgres',
  }
};

production: {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user:     'username',
    password: 'password'
  }