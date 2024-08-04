"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student_Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student_Word.init(
    {
      studentId: DataTypes.STRING,
      wordId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Student_Word",
      freezeTableName: true,
    }
  );
  return Student_Word;
};
