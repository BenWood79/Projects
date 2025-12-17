module.exports = (sequelize, Sequelize) => {
  const Species = sequelize.define(
    "Species",
    {
      Species: Sequelize.DataTypes.STRING,
    },
    {
      tableName: "Species",
      timestamps: false,
    }
  );
  return Species;
};
