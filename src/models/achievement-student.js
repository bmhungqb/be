"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Achievement_Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achievement_Student.init(
    {
      studentId: DataTypes.STRING,
      achievementId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Achievement_Student",
      freezeTableName: true,
    }
  );
  return Achievement_Student;
};
