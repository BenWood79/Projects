const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class UserService {
  constructor() {}

  async create(firstname, lastname, username, password, role = "member") {
    // Check if username already exists
    const existing = await sequelize.query(
      "SELECT * FROM Users WHERE username = :username",
      {
        replacements: { username },
        type: QueryTypes.SELECT,
      }
    );

    if (existing.length > 0) {
      throw new Error("Username already exists");
    }

    // Insert new user
    const result = await sequelize.query(
      "INSERT INTO Users (firstname, lastname, username, password, role) VALUES (:firstname, :lastname, :username, :password, :role)",
      {
        replacements: { firstname, lastname, username, password, role },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  }

  async getAll() {
    const users = await sequelize.query("SELECT * FROM Users", {
      type: QueryTypes.SELECT,
    });
    return users;
  }

  async getOne(userId) {
    const users = await sequelize.query(
      "SELECT * FROM Users WHERE id = :userId",
      {
        replacements: { userId },
        type: QueryTypes.SELECT,
      }
    );
    return users.length > 0 ? users[0] : null;
  }

  async getOneByName(username) {
    const users = await sequelize.query(
      "SELECT * FROM Users WHERE username = :username",
      {
        replacements: { username },
        type: QueryTypes.SELECT,
      }
    );
    return users.length > 0 ? users[0] : null;
  }

  async deleteUser(userId) {
    const result = await sequelize.query(
      "DELETE FROM Users WHERE id = :userId",
      {
        replacements: { userId },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  }
}

module.exports = UserService;
