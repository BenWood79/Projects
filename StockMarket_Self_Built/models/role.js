module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      role: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Role;
};
