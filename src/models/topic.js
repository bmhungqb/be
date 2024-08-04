"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Topic.belongsToMany(models.Level, {
      //   through: "Level_Topic",
      // });
      // Topic.hasMany(models.Word);
      // Topic.hasMany(models.Level_Topic);
    }
  }
  Topic.init(
    {
      nameEn: DataTypes.STRING,
      nameVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
