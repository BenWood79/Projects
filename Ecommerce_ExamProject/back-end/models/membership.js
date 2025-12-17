module.exports = (sequelize, DataTypes) => {
    const Memberships = sequelize.define('Memberships', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      max: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },{
        timestamps: false,
    }
    );
    Memberships.associate = function (models) {
        Memberships.belongsTo(models.Users)
    }
    return Memberships;
};
