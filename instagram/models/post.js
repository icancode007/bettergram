module.exports = function(sequelize, Sequelize) {
	return(sequelize.define('post', {
		post:{
            type: Sequelize.STRING,
            allowNull:false,
            }
	}, {
		defaultScope: {
			order: [['createdAt', 'DESC']]
		},
	  getterMethods: {
            imgUrl: function(){
                return(`https://s3.amazonaws.com/instaclone-june-2017/posts/${this.id}`);
            },
            imgThumb: function(){
                return(`${this.imgUrl}-thumbnail`);
            }
	  },
      classMethods:{
          associate: function(models){
            models.post.belongsTo(models.user);
          }
    }
	}));
};