const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstname: Sequelize.DataTypes.STRING,
      lastname: Sequelize.DataTypes.STRING,
      password: Sequelize.DataTypes.STRING,
      role: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "member",
      },
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Adoptions);
  };
  return User;
};
