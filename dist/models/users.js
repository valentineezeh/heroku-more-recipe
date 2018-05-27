'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' }
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      // beforeCreate: (newUser) => {
      //   newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      //   newUser.confirmPassword = bcrypt.hashSync(newUser.confirmPassword, bcrypt.genSaltSync(8));
      // },
      afterUpdate: function afterUpdate(newUser) {
        newUser.password = _bcrypt2.default.hashSync(newUser.password, _bcrypt2.default.genSaltSync(8));
        newUser.confirmPassword = _bcrypt2.default.hashSync(newUser.confirmPassword, _bcrypt2.default.genSaltSync(8));
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Recipes, { foreignKey: 'userId' });
    User.hasMany(models.Reviews, { foreignKey: 'userId' });
    User.hasMany(models.Favorites, { foreignKey: 'userId' });
    User.hasMany(models.votes, { foreignKey: 'userId' });
  };
  return User;
}; /**
   * This function creates the model of
   * Users table in the database, specifying
   * relationships, datatypes and constraints.
   *
   */