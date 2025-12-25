module.exports = (sequelize, Sequelize) => {
  const Adoptions = sequelize.define(
    "Adoptions",
    {
      User: Sequelize.DataTypes.STRING,
      AnimalId: Sequelize.DataTypes.INTEGER,
      UserId: Sequelize.DataTypes.INTEGER,
    },
    {
      tableName: "Adoptions",
      timestamps: false,
    }
  );
  Adoptions.associate = function (models) {
    Adoptions.belongsTo(models.Animals);
  };
  return Adoptions;
};
