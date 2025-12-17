module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define(
    "Stock",
    {
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      symbol: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.DataTypes.FLOAT,
        allowNull: false,
      },
      volume: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return Stock;
};
