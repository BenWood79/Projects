const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const orders = require("../models/orders");

class OrdersService {
    constructor(db) {
        this.client = db.sequelize;
        this.Orders = db.Orders;
    }
    //Refactored and debugged using Copilot
    async getAll() {
        const orders = await sequelize.query(
            `SELECT outer_orders.*, memberships.name AS membershipName,
                (
                    SELECT SUM(quantity)
                    FROM orders
                    WHERE orders.orderNumber = outer_orders.orderNumber
                ) AS totalQuantity,
                CASE 
                    WHEN memberships.name = 'Silver' AND (
                        SELECT SUM(quantity)
                        FROM orders
                        WHERE orders.orderNumber = outer_orders.orderNumber
                    ) BETWEEN 15 AND 30
                        THEN ROUND(outer_orders.price * (1 - memberships.discount / 100), 2)
                    WHEN memberships.name = 'Gold' AND (
                        SELECT SUM(quantity)
                        FROM orders
                        WHERE orders.orderNumber = outer_orders.orderNumber
                    ) > 30
                        THEN ROUND(outer_orders.price * (1 - memberships.discount / 100), 2)
                    ELSE outer_orders.price
                END AS discountedPrice
            FROM orders AS outer_orders
            JOIN users ON outer_orders.userId = users.id
            JOIN memberships ON users.membershipId = memberships.id`, 
            {
                type: QueryTypes.SELECT,
            }
        );
        return orders
    };

    async deleteOrder(orderId) {
        return this.Orders.destroy({
            where: {id: orderId}
        }).catch (function(err){
            console.log(err);
        }); 
    }
    //Refactored and debugged using Copilot
    async create ({orderNumber, status, imgurl, name, price, quantity, userId, productId}) {     
        await sequelize.query(
            `INSERT INTO orders
                (orderNumber, status, imgurl, name, price, quantity, userId, productId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        {
            replacements: [
                orderNumber, status, imgurl, name, price, quantity, userId, productId
            ],
            type: QueryTypes.INSERT
        });
       
        const result = await sequelize.query(
         `SELECT SUM(quantity) AS totalQuantity FROM orders WHERE userId = ?`,
         {
            replacements: [userId],
            type: QueryTypes.SELECT
         }
        );
        const totalQuantity = result[0]?.totalQuantity || 0;
        
        let newMembershipName = "Bronze";
        if (totalQuantity > 30) {
            newMembershipName = "Gold";
        } else if (totalQuantity >= 15){
            newMembershipName = "Silver";
        }
        
        const [membership] = await sequelize.query(
            `SELECT id FROM memberships WHERE name = ? LIMIT 1`,
            {
                replacements: [newMembershipName],
                type: QueryTypes.SELECT
            }
        );
        
        if(membership) {
            await sequelize.query(
                `UPDATE users SET membershipId = ? WHERE id = ?`,
                {
                    replacements: [membership.id, userId],
                    type: QueryTypes.UPDATE
                }
            )
        };
        return { userId, membership: membership.id };
    }

    //----------------Initialized using Copilot (lines 101 - 120) -------------------//
    async updateUserMembership(userId, membershipName) {
    const [membership] = await sequelize.query(
        `SELECT id FROM memberships WHERE name = ? LIMIT 1`,
        {
            replacements: [membershipName],
            type: QueryTypes.SELECT
        }
    );
    if (membership) {
        await sequelize.query(
            `UPDATE users SET membershipId = ? WHERE id = ?`,
            {
                replacements: [membership.id, userId],
                type: QueryTypes.UPDATE
            }
        );
        return { userId, membership: membership.id };
    }
    return null;
}

};

module.exports = OrdersService;