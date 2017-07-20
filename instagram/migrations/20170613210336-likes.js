'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return (queryInterface.createTable('likes', {
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
       userId: {
        type:       Sequelize.INTEGER,
        allowNull:  false,
        onDelete:  'cascade',
        references: {
          model: 'users',
          key:   'id'
        }
      }
    }));
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};
