const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class IndexService {
    constructor(db) {
        this.client = db.sequelize;
        this.Users = db.Users;
        this.Courses = db.Courses;
        this.Roles = db.Roles;
    }

    async getAllUsers() {
        await sequelize.query(
            `SELECT * FROM Users`,
            {
                type: QueryTypes.SELECT
            }
        )
    }

    async getALLCourses() {
        await sequelize.query(
            `SELECT * FROM Courses`,
            {
                type: QueryTypes.SELECT
            }
        )
    }

    async create(firstname, lastname, username, email, address, telephone, encryptedPassword, salt, roleId) {
        return this.Users.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            address: address,
            telephone: telephone,
            encryptedPassword: encryptedPassword,
            salt: salt,
            roleId: roleId
        });
    }

    async getOne(username) {        
        return await this.Users.findOne({
            where: {username: username},
            include: [{ model: this.Roles }]
        }).catch (function(err){
            console.log(err);
        }); 
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
}

module.exports = IndexService;