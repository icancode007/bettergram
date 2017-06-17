'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return (queryInterface.createTable('comments', {
      id: {
        type:          Sequelize.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
        allowNull:     false
      },
      postId: {
        type:       Sequelize.INTEGER,
        allowNull:  false,
        onDelete:  'cascade',
        references: {
          model: 'posts',
          key:   'id'
        }
      },
      comments: {
        type:      Sequelize.TEXT,
        allowNull: false,
      }
    }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
