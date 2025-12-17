const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

class AnimalService {
  constructor(db) {}

  async getAllAnimals() {
    const all = await sequelize.query("SELECT * FROM Animals", {
      type: QueryTypes.SELECT,
    });
    return all;
  }

  async getAllSpecies() {
    const all = await sequelize.query("SELECT * FROM Species", {
      type: QueryTypes.SELECT,
    });
    return all;
  }

  async getAllTemperaments() {
    const all = await sequelize.query("SELECT * FROM Temperaments", {
      type: QueryTypes.SELECT,
    });
    return all;
  }

  async createSpecies(species) {
    const result = await sequelize.query(
      "INSERT INTO Species (Species) VALUES (:species)",
      {
        replacements: { species },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  }

  async createTemperament(temperament) {
    const result = await sequelize.query(
      "INSERT INTO Temperaments (Temperament) VALUES (:temperament)",
      {
        replacements: { temperament },
        type: QueryTypes.INSERT,
      }
    );
    return result;
  }

  async getSizeOfAllAnimals() {
    const result = await sequelize.query(
      `SELECT * FROM Animals ORDER BY Size DESC LIMIT 12`,
      { type: QueryTypes.SELECT }
    );
    return result;
  }

  async adoptAnimal(userId, animalId) {
    await sequelize.transaction(async (t) => {
      await sequelize.query(
        "INSERT IGNORE INTO Adoptions (UserId, AnimalId) VALUES (:userId, :animalId)",
        {
          replacements: { userId, animalId },
          type: QueryTypes.INSERT,
          transaction: t,
        }
      );

      await sequelize.query(
        "UPDATE Animals SET Adopted = 'true' WHERE id = :animalId",
        {
          replacements: { animalId },
          type: QueryTypes.UPDATE,
          transaction: t,
        }
      );
    });
  }

  async cancelAdoption(animalId) {
    await sequelize.transaction(async (t) => {
      await sequelize.query(
        "DELETE FROM Adoptions WHERE AnimalId = :animalId",
        {
          replacements: { animalId },
          type: QueryTypes.DELETE,
          transaction: t,
        }
      );
      await sequelize.query(
        "UPDATE Animals SET Adopted = 'false' WHERE id = :animalId",
        {
          replacements: { animalId },
          type: QueryTypes.UPDATE,
          transaction: t,
        }
      );
    });
  }

  async editSpecies(id, speciesInput) {
    await sequelize.query(
      "UPDATE Species SET Species = :speciesInput WHERE id = :id",
      {
        replacements: { id, speciesInput },
        type: QueryTypes.UPDATE,
      }
    );
  }

  async editTemperament(id, temperamentInput) {
    await sequelize.query(
      "UPDATE Temperaments SET Temperament = :temperamentInput WHERE id = :id",
      {
        replacements: { id, temperamentInput },
        type: QueryTypes.UPDATE,
      }
    );
  }

  async delSpec(deleteSpec) {
    const result = await sequelize.query(
      "DELETE FROM Species WHERE id = :deleteSpec",
      {
        replacements: { deleteSpec },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  }

  async delTemp(deleteTemp) {
    const result = await sequelize.query(
      "DELETE FROM Temperaments WHERE id = :deleteTemp",
      {
        replacements: { deleteTemp },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  }

  async getAgeOfAllAnimals() {
    const all = await sequelize.query(
      `SELECT *, TIMESTAMPDIFF(YEAR, Birthday, CURDATE()) AS Age FROM Animals ORDER BY Age DESC LIMIT 12`,
      { type: QueryTypes.SELECT }
    );
    return all;
  }

  async dateRange(startDate, endDate) {
    const result = await sequelize.query(
      "SELECT * FROM Animals WHERE Birthday BETWEEN :startDate AND :endDate",
      {
        replacements: { startDate, endDate },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

  async getPopularNames() {
    const result = await sequelize.query(
      `SELECT Name, COUNT(*) as count FROM Animals GROUP BY Name ORDER BY count DESC LIMIT 10`,
      { type: QueryTypes.SELECT }
    );
    return result;
  }

  async searchAnimals(searchTerm) {
    const results = await sequelize.query(
      "SELECT * FROM Animals WHERE Name LIKE :search OR Species LIKE :search",
      {
        replacements: { search: `%${searchTerm}%` },
        type: QueryTypes.SELECT,
      }
    );
    return results;
  }

  async adopted(animalId) {
    const result = await sequelize.query(
      "UPDATE Animals SET Adopted = 'true' WHERE id = :animalId",
      {
        replacements: { animalId },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  }
}

module.exports = AnimalService;
