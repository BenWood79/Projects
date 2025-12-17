const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class RolesService {
    constructor (db) {
        this.client = db.sequelize;
        this.Roles = db.Roles;
    }

    async createRoles(id, admin, user) {
        return this.Roles.findOrCreate({
          where: { id },
          defaults: { admin, user },
        });
      }

    async getAll() {
        const roles = await this.Roles.findAll({
            where: {},
        })
        return roles;
    };
};

module.exports = RolesService;