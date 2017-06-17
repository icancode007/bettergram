module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('post', {
		post:{
            type: DataTypes.STRING,
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
            models.post.hasMany(models.comment)
          },findwithPost: function(post){
              return(this.findOne({
                  where: {
						post: post
					},
					include: [
						sequelize.models.user,
						sequelize.models.comment
					],
					order: [
						[sequelize.models.comment, 'createdAt', 'DESC']
                    ]
              }));
          }
    }
	}));
};
