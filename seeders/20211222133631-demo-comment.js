'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    // let comments = [];
    // for (let i = 1; i < 20; i++) {
    //   let comment = {
    //     comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit porro dolorum asperiores nemo delectus, nulla quos voluptas ullam quis, aut illo provident dignissimos blanditiis expedita! Accusamus et a reprehenderit impedit?',
    //     // UserId: Math.floor((Math.random() +1)* 10),
    //     ProductId: Math.floor(Math.random() * 19 + 1),
    //     createdAt: Sequelize.literal('NOW()'),
    //     updatedAt: Sequelize.literal('NOW()')
    //   }
    //   comments.push(comment);
    // }
    // console.log(comments);
    // await queryInterface.bulkInsert('Comments', comments);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
