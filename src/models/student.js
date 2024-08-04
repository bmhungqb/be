"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      name: DataTypes.STRING,
      grade: DataTypes.STRING,
      birthday: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      schoolId: DataTypes.INTEGER,
      cup: DataTypes.INTEGER,
      AvatarId: DataTypes.INTEGER,
      FrameId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
