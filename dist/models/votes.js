'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.UUID,
      references: {
        model: 'Recipe',
        key: 'id'
      }
    },
    vote: {
      type: DataTypes.BOOLEAN
    }
  });
  return votes;
};