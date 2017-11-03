const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      fullName: process.env.valFullName,
      email: process.env.valEmail,
      sex: process.env.valSex,
      userName: process.env.valUserName,
      password: bcrypt.hashSync(process.env.valPassword, bcrypt.genSaltSync(8)),
      confirmPassword: bcrypt.hashSync(process.env.valPasswordConf, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullName: process.env.userFullName,
      email: process.env.userEmail,
      sex: process.env.userSex,
      userName: process.env.userUserName,
      password: bcrypt.hashSync(process.env.userPassword, bcrypt.genSaltSync(8)),
      confirmPassword: bcrypt.hashSync(process.env.userPasswordConf, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
  },

  down(queryInterface, Sequelize) {
    return queryInterface
      .bulkDelete('Users');
  }
};
