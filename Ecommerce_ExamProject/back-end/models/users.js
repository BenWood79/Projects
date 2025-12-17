module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('Users', {
        firstname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        telephone: {
            type: Sequelize.DataTypes.STRING,
        },
        encryptedPassword: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false,
        },
        salt: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false,
        }
    }, {
        timestamps: true,
        });
        Users.associate = function (models) {
            Users.belongsTo(models.Roles);
            Users.belongsTo(models.Orders);
            Users.belongsTo(models.Memberships);
        }
        return Users;
};