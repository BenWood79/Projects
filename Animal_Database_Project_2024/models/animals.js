module.exports = (sequelize, Sequelize) => {
  const Animals = sequelize.define(
    "Animals",
    {
      Name: Sequelize.DataTypes.STRING,
      Species: Sequelize.DataTypes.STRING,
      Birthday: Sequelize.DataTypes.DATEONLY,
      Temperament: Sequelize.DataTypes.STRING,
      Size: Sequelize.DataTypes.STRING,
      Age: Sequelize.DataTypes.INTEGER,
      Adopted: Sequelize.DataTypes.STRING,
    },
    {
      tableName: "Animals",
      timestamps: false,
    }
  );
  Animals.associate = function (models) {
    Animals.hasMany(models.Temperaments);
    Animals.hasOne(models.Adoptions);
  };
  return Animals;
};
