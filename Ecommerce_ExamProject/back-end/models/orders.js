module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define('Orders', {
        orderNumber: {
            type: Sequelize.DataTypes.STRING,
        },
        status:{
            type: Sequelize.DataTypes.STRING,
        },
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        imgurl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        name: {
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
        userId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        timestamps: false,
    }
    );
    Orders.associate = function (models) {
        Orders.belongsTo(models.Users,{ foreignKey: 'userId' } );
        Orders.belongsTo(models.Products,{ foreignKey: 'productId' } );
    }
    return Orders;
};
