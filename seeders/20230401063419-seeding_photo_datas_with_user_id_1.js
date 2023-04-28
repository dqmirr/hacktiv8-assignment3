'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [{
      title: 'Photo User1',
      caption: 'Photo User1 Caption',
      image_url:'https://photojadul.com',
      UserId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Photo2 User1',
      caption: 'Photo2 User1 Caption',
      image_url:'https://photojadul.com',
      UserId: 1,
      createdAt:new Date(),
      updatedAt:new Date()
    },
    {
      title: 'Photo3 User1',
      caption: 'Photo3 User1 Caption',
      image_url:'https://photojadul.com',
      UserId: 1,
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
