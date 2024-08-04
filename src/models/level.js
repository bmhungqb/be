"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Level.belongsToMany(models.Student, {
      //   through: "Game",
      // });
      // Level.belongsToMany(models.Topic, {
      //   through: "Level_Topic",
      // });
      // Level.hasMany(models.Game);
      // Level.hasMany(models.Level_Topic);
    }
  }
  Level.init(
    {
      name: DataTypes.STRING,
      difficulty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Level",
    }
  );
  return Level;
};
