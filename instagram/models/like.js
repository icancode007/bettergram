module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('like', {
      }
	,{ 
    defaultScope: {
			order: [['createdAt', 'DESC']]
		},
    classMethods:{
          associate: function(models){
            models.like.belongsTo(models.post);
            models.like.belongsTo(models.user);
      }
    }
	}));
};
