"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Word.belongsTo(models.Topic);
      // Word.belongsToMany(models.Student, {
      //   through: "Student_Word",
      // });
    }
  }
  Word.init(
    {
      levelVocab: DataTypes.STRING,
      vocab: DataTypes.STRING,
      topicId: DataTypes.INTEGER,
      phonetic: DataTypes.STRING,
      vietnamese: DataTypes.TEXT,
      example: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Word",
    }
  );
  return Word;
};
