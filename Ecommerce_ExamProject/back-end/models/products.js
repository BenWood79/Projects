module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define('Products', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        category: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        imgurl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        date_added: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
        },
        deleted: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: true,
        },        
    },{
        timestamps: true,
    });
    return Products;
};
