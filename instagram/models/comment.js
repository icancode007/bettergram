module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('comment', {
		comments:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
          notEmpty: {
             msg: 'You Cannot send an empty comment!'
        }
      }
    }
	},{ 
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
