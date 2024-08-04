"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Level_Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Level_Topic.belongsTo(models.Level);
      // Level_Topic.belongsTo(models.Topic);
    }
  }
  Level_Topic.init(
    {
      levelId: DataTypes.INTEGER,
      topicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Level_Topic",
      freezeTableName: true,
    }
  );
  return Level_Topic;
};
