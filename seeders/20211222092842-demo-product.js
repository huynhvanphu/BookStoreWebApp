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
    let products = [];
    for(let i = 1; i < 20; i++) {
      let product = {
        name: `Book ${i}`,
        imgPath: `/image/book${i}.jpg`,
        summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit porro dolorum asperiores nemo delectus, nulla quos voluptas ullam quis, aut illo provident dignissimos blanditiis expedita! Accusamus et a reprehenderit impedit?',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit porro dolorum asperiores nemo delectus, nulla quos voluptas ullam quis, aut illo provident dignissimos blanditiis expedita! Accusamus et a reprehenderit impedit?',
        price: Math.random() *100,
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
      products.push(product);
    }
    console.log(products);
    await queryInterface.bulkInsert('Products', products);
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
