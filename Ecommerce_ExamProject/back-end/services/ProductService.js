const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Products = db.Products;
    }

    async createTableContent(id, category, brand, imgurl, name, description, price, quantity, date_added, deleted) {
        return this.Products.findOrCreate({
            where: { id },
            defaults: {
            id,
            category, 
            brand, 
            imgurl, 
            name, 
            description,
            price,
            quantity,
            date_added,
            deleted,
            }
        })
    }

    async findOne(id) {
        const [product] = await sequelize.query(
            `SELECT * FROM Products WHERE id  = :id`, 
        {
            replacements: { id },
            type: QueryTypes.SELECT,
        }
        );
        return product
    }

    async getAllProducts() {
        const products = await sequelize.query(
            `SELECT * FROM Products`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return products
    };


    async getAppleBrands() {
        const appleBrands = await sequelize.query(
            `SELECT * FROM Products WHERE brand = 'Apple'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return appleBrands
    };

    async getSamsungBrands() {
        const samsungBrands = await sequelize.query(
            `SELECT * FROM Products WHERE brand = 'Samsung'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return samsungBrands
    };


    async getXiaomiBrands() {
        const xiaomiBrands = await sequelize.query(
            `SELECT * FROM Products WHERE brand = 'Xiaomi'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return xiaomiBrands
    };


    async getMxqBrands() {
        const mxqBrands = await sequelize.query(
            `SELECT * FROM Products WHERE brand = 'MXQ'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return mxqBrands
    };

    async getAllPhones() {
        const phones = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'Phones'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return phones
    };

    async getAllTvs() {
        const tvs = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'TVs'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return tvs
    };

    async getAllWatches() {
        const watches = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'Watches'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return watches
    };

    async getAllDesktops() {
        const desktops = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'Desktops'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return desktops
    };

    async getAllLaptops() {
        const laptops = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'Laptops'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return laptops
    };

    async getAllTablets() {
        const tablets = await sequelize.query(
            `SELECT * FROM Products WHERE category = 'Tablets'`, 
            {
            type: QueryTypes.SELECT,
            }
        );
        return tablets
    };
    //Refactored and debugged using Copilot
    async search(searchTerm) {
        const lowered = searchTerm ? searchTerm.trim().toLowerCase() : '';
        const search = await sequelize.query(
            `SELECT * FROM Products
                WHERE LOWER(name) 
                    LIKE LOWER(:searchTerm) 
                    OR LOWER(description) 
                    LIKE LOWER(:searchTerm)
                    OR LOWER(brand)
                    LIKE LOWER(:searchTerm)
                    OR LOWER(category)
                    LIKE LOWER(:searchTerm)`,
            {
            replacements: { searchTerm: `%${lowered}%` },
            type: QueryTypes.SELECT,
            }
        );
        return search;
    }
    //Refactored and debugged using Copilot
    async update(product) {
        const [updated] = await sequelize.query(
            `UPDATE Products SET 
            name = :name, 
            brand = :brand, 
            category = :category, 
            description = :description, 
            price = :price,
            quantity = :quantity,
            date_added = :date_added,
            imgurl = :imgurl,
            deleted = :deleted
            WHERE id = :id`,
            { 
                replacements: { 
                id: Number(product.id),//forced to number
                name: product.name,
                brand: product.brand,
                category: product.category,
                description: product.description,
                price: Number(product.price,), //forced to number
                quantity: Number(product.quantity,), // forced to numnber
                date_added: product.date_added,
                imgurl: product.imgurl,
                deleted: product.deleted
                },
                type: QueryTypes.UPDATE 
            }
        );
        return updated;
    }

    async softDelete (id, deleted) {
        await sequelize.query(
            `UPDATE Products SET deleted = NOT deleted WHERE id = :id`,
            {
                replacements: { id, deleted},
                type: QueryTypes.UPDATE
            }
        )
    }


};

module.exports = ProductService;