module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('posts', 'createdAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		}));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('posts', 'createdAt'));
  }
};