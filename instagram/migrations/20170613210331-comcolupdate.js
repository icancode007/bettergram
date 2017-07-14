module.exports = {
  up: function(queryInterface, Sequelize) {
    return(
        [queryInterface.addColumn('comments', 'createdAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		}),
        queryInterface.addColumn('comments', 'updatedAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		})
        ])
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('comments', 'createdAt'));
  }
};