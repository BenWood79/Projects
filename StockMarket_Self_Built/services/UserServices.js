const { sequelize } = require("sequelize");
const { QueryTypes } = require("../models");

class UserServices {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User; 
  }

  async getAllUsers() {
    const user = await this.User.findAll({
      where: {},
    });
    return user;
  }

  async getUserByEmail(username) {
    const user = await this.User.findOne({
      where: { username: username },
    });
    return user;
  }

  async createUser(fullname, username, encryptedPassword, salt, role) {
    const user = await this.User.create({
      fullname,
      username,
      encryptedPassword,
      salt,
      role,
    });
    return user;
  }
}

module.exports = UserServices;
