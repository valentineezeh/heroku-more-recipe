'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(function () {
      return queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        fullName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        sex: {
          type: Sequelize.STRING,
          allowNull: false
        },
        userName: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        confirmPassword: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};