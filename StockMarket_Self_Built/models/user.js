module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      fullname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      encryptedPassword: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
      salt: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false,
      },
      role: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return User;
};
