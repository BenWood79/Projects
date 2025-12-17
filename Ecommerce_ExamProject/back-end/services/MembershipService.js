const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class MembershipService {
    constructor(db) {
        this.client = db.sequelize;
        this.Memberships = db.Memberships;
    }

    async createMembership(membership) {
        console.log('Memberships created') //Debugging
        return this.Memberships.findOrCreate({
            where: { name: membership.name },
            defaults: membership,
        });
      }

    async getAll() {
        console.log('Fetching all memberships') //Debugging
        const memberships = await sequelize.query(
            `SELECT * FROM memberships`,
            {
                type: QueryTypes.SELECT
            }
        )
        return memberships
    };
};

module.exports = MembershipService;