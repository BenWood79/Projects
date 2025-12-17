const { sequelize } = require("sequelize");
const { QueryTypes } = require("../models");

class StockServices {
    constructor(db) {
        this.client = db.sequelize;
        this.Stocks = db.Stocks;
    }

    async getAllStocks() {
        const stocks = await this.Stocks.findAll({
            where: {},
        });
        return stocks;
    }

    async getStockByName(name) {
        const stock = await this.Stocks.findOne({
            where: { name },
        });
        return stock;
    }
}

module.exports = StockServices;
