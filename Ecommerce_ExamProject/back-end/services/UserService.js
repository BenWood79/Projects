const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class UserService {
    constructor(db) {
        this.client = db.sequelize;
        this.Users = db.Users;
        this.Roles = db.Roles;
        this.Membership = db.Membership;
    }
    //Refactored and debugged using Copilot
    async createAdminUser(
        firstname, 
        lastname, 
        username, 
        email, 
        address, 
        telephone, 
        encryptedPassword, 
        salt,
        RoleId,
        MembershipId
    ){
        return this.Users.findOrCreate({
            where: { username },
            defaults: {
            firstname,
            lastname,
            username,
            email,
            address,
            telephone,
            encryptedPassword,
            salt,
            RoleId,
            MembershipId
            },
        });
    }

    async getAllUsers(){
        const users = await this.Users.findAll({
            where: {},
        });
        return users;
    }

    async getOne(username) {        
        return await this.Users.findOne({
            where: {username: username},
            include: [{ model: this.Roles }]
        }).catch (function(err){
            console.log(err);
        }); 
    }

    async getMembership(userId){
        const [user] = await sequelize.query(
            `SELECT users.*, memberships.name AS membershipName
            FROM users
            JOIN memberships ON users.membershipId = memberships.id
            WHERE users.id = ? LIMIT 1`,
            {
                replacements: [userId],
                type: QueryTypes.SELECT
            }
        );
        return user
    }

    async create(firstname, lastname, username, email, address, telephone, encryptedPassword, salt, RoleId, MembershipId) {
        return this.Users.create({
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            address: address,
            telephone: telephone,
            encryptedPassword: encryptedPassword,
            salt: salt,
            RoleId: 2,
            MembershipId: 1
        });
    }
    //Refactored and debugged using Copilot
    async update(user) {
        const [updated] = await sequelize.query(
            `UPDATE users SET 
            firstname = :firstname,
            lastname = :lastname,
            username = :username,
            email = :email,
            address = :address,
            telephone = :telephone
            WHERE id = :id`,
            { 
                replacements: { 
                id: Number(user.id),//forced to number
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                address: user.address,
                telephone: Number(user.telephone,), // forced to numnber
                },
                type: QueryTypes.UPDATE 
            }
        );
        return updated;
    } 

    async deleteUser(userId) {
        return this.Users.destroy({
            where: {id: userId}
        }).catch (function(err){
            console.log(err);
        }); 
    }
}

module.exports = UserService;