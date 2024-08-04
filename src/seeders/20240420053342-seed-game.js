"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          levelId: 2,
          studentId: 1,
          score: 1234,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          levelId: 2,
          studentId: 2,
          score: 2134,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          levelId: 2,
          studentId: 3,
          score: 1321,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          levelId: 2,
          studentId: 4,
          score: 3214,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          levelId: 2,
          studentId: 5,
          score: 4123,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
