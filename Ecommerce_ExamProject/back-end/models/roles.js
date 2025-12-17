module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define('Roles', {
        admin: {
            type: Sequelize.DataTypes.STRING,
        },
        user: {
            type: Sequelize.DataTypes.STRING,
        }
    },{
        timestamps: true,
    }
    );
    Roles.associate = function (models) {
        Roles.hasMany(models.Users);
    }
    return Roles;
};
