module.exports = (sequelize, Sequelize) => {
  const Temperaments = sequelize.define(
    "Temperaments",
    {
      Temperament: Sequelize.DataTypes.STRING,
    },
    {
      tableName: "Temperaments",
      timestamps: false,
    }
  );
  Temperaments.associate = function (models) {
    Temperaments.belongsTo(models.Animals);
  };
  return Temperaments;
};
