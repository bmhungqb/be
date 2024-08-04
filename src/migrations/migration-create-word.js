"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Words", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      levelVocab: {
        type: Sequelize.STRING,
      },
      vocab: {
        type: Sequelize.STRING,
      },
      topicId: {
        type: Sequelize.INTEGER,
      },
      phonetic: {
        type: Sequelize.STRING,
      },
      vietnamese: {
        type: Sequelize.TEXT,
      },
      example: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Words");
  },
};
