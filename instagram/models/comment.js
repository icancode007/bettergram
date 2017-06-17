module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('comment', {
		comment:{
            type: DataTypes.STRING,
            allowNull:false,
            }
	}, {
		defaultScope: {
			order: [['createdAt', 'DESC']]
		},
      classMethods:{
          associate: function(models){
            models.comment.belongsTo(models.post);
          }
    }
	}));
};
