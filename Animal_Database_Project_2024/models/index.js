const Sequelize = require('sequelize');
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
//const { Sequelize, Model, DataTypes } = require('sequelize');

require('dotenv').config()
const connection = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DIALECT,
    dialectmodel: process.env.DIALECTMODEL,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT) || 3306,
}

//Connect to db
const sequelize = new Sequelize(connection);

const db = {}
db.sequelize = sequelize
fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) &&
        (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize,
            Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
console.log(db);
module.exports = db

