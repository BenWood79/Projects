module.exports = (sequelize, Sequelize) => {
    const Carts = sequelize.define('Carts', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
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
        userId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        indexes: [
            {
                unique: true,
                fields: ['userId', 'productId']//Refactored using Copilot
            }
        ],
        timestamps: false,
    });
    Carts.associate = function (models) {
        Carts.belongsTo(models.Users,{ foreignKey: 'userId' } );
        Carts.belongsTo(models.Products,{ foreignKey: 'productId' } );
    }
    return Carts;
};
