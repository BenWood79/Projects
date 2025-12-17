const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class CartService {
    constructor(db) {
        this.client = db.sequelize;
        this.Carts = db.Carts;
    }

    async getAll() {
       const cart = await sequelize.query(`SELECT * FROM carts`, 
        {type: QueryTypes.SELECT}
       )
        return cart
    };
    //Refactored and debugged using Copilot
    async addOrIncrement(id, category, brand, imgurl, name, description, price, quantity, date_added, deleted, userId, productId) {
        await sequelize.query(
            `INSERT INTO carts
                (id, category, brand, imgurl, name, description, price, quantity, date_added, deleted, userId, productId)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
            {
                replacements: [
                    id, category, brand, imgurl, name, description, price, quantity, date_added, deleted, userId, productId
                ],
                type: QueryTypes.INSERT
            }
        );
    }

    async deleteItem(productId) {
        return this.Carts.destroy({
            where: {id: productId}
        }).catch (function(err){
            console.log(err);
        }); 
    }

    async updateQuantity(itemId, newQuantity) {
        const [cartItem] = await sequelize.query(
            `SELECT quantity, productId FROM carts WHERE id = ?`,
            {
                replacements: [itemId],
                type: QueryTypes.SELECT
            }
        );

        if(!cartItem) return {  error: "Cart item not found" };

        const difference = newQuantity - cartItem.quantity;

        const [product] = await sequelize.query(
            `SELECT quantity FROM products WHERE id = ?`,
            {
                replacements: [cartItem.productId],
                type: QueryTypes.SELECT
            }
        );

        if(!product) return { error: "Product not found" };

        
        if (difference > 0 && product.quantity < difference) {
            return { error: "Desired increase in quantity exceeds available stock" }
        }

        
        await sequelize.query(
            `UPDATE carts SET quantity = ? WHERE id = ?`,
            {
                replacements: [newQuantity, itemId],
                type: QueryTypes.UPDATE
            }
        )
        
        await sequelize.query(
            `UPDATE products SET quantity = quantity - ? WHERE id = ?`,
            {
                replacements: [difference, cartItem.productId],
                type: QueryTypes.UPDATE
            }
        );
        return { success: true }
    }
        
};



module.exports = CartService;