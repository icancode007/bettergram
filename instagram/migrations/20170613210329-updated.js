module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('posts', 'updatedAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		}));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('posts', 'updatedAt'));
  }
};