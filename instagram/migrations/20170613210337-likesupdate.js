module.exports = {
  up: function(queryInterface, Sequelize) {
    return(
        [queryInterface.addColumn('likes', 'createdAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		}),
        queryInterface.addColumn('likes', 'updatedAt', {
			type:         Sequelize.DATE,
			allowNull:   false
		})
        ])
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('likes', 'createdAt'));
  }
};