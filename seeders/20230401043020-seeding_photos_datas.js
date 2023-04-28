'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Photos', [{
        title: 'Photo1',
        caption: 'Photo Caption',
        image_url:'https://photojadul.com',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: 'Photo2',
        caption: 'Photo2 Caption',
        image_url:'https://photojadul.com',
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        title: 'Photo3',
        caption: 'Photo3 Caption',
        image_url:'https://photojadul.com',
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
