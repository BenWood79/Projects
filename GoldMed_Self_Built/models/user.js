module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        firstName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        telephone: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        encryptedPassword: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });

    User.associate = function (models) {
        User.hasOne(models.Roles);
    };

    return User;
}