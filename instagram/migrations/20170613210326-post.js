'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return(queryInterface.createTable('posts', {
      id: {
        type:          Sequelize.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false
      },
      userId: {
        type:       Sequelize.INTEGER,
        allowNull:  false,
        onDelete:  'cascade',
        references: {
          model: 'users',
          key:   'id'
        }
      },
      post: {
        type:      Sequelize.TEXT,
        allowNull: false,
      }
  },

  down: function (queryInterface, Sequelize) {
   return(queryInterface.dropTable('posts'));
  }
};
