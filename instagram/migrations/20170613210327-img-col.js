module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('users', 'imageurl', {
			type:         Sequelize.STRING,
			allowNull:    true,
			defaultValue: ''
		}));
  },

  down: function(queryInterface, Sequelize) {
    return(queryInterface.removeColumn('users', 'imageurl'));
  }
};