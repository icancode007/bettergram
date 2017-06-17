module.exports = function(sequelize,Sequelize) {
  var User = sequelize.define('user', {
    username:{
            type:  Sequelize.STRING,
            allowNull: false,
            validate:  {
              notEmpty:  {
                msg:'Username is required'
        },
        isUnique: function(value,next){
          //this is a custom made validation to check if the address is uniqu
             var self = this;
             User.findOne({
                where:{
                  username:  value
              }
          }).then(function(user){
              if(user && user.id != self.id)
            //if the current validating user matches one from the  database
                return(next('This Username is alredy taken try another one'))
              else
                return(next())
            });
          }
        }
      },
    phonenumber:{
        type:  Sequelize.STRING,
        allowNull: false,
        validate:  {
          notEmpty:  {
            msg:'Phone Number is required'
        },
        isUnique: function(value,next){
          //this is a custom made validation to check if the address is uniqu
            var self = this;
            User.findOne({
              where:{
                phonenumber:  value
            }
          }).then(function(user){
              if(user && user.id != self.id)
              //if the current validating user matches one from the  database
                return(next('This Phone Number is alredy registerted, try a different one'))
              else
                return(next())
          });
        }
      }
    },
    email:
    {
        type:  Sequelize.STRING,
        allowNull: false,
          validate: {
            isEmail: {
              msg: 'This Email is not valid'
        },
        isUnique: function(value,next){
          //this is a custom made validation to check if the address is uniqu
          var self = this;
          User.findOne({
            where:{
              email:  value
            }
          }).then(function(user){
            if(user && user.id != self.id)
            //if the current validating user matches one from the  database
              return(next('This Email is alredy registerted'))
            else
              return(next())
          });
        }
      }
    },
    bio:{
      type:Sequelize.STRING
    }
    ,
    imageurl:{
      type:Sequelize.STRING
    }
    ,
    password:
    {
      type:  Sequelize.STRING,
      allowNull: false,
        validate:{
          len:{
            args: [{min: 8}],
            msg:  'Password length most be at least 8'
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
          // associations can be defined here
          models.user.hasMany(models.post);
      },
        findWithUsername:function(username){
            //anything that is under class methods is available to use for its model
            //different from getterMethods who only lets instances of models to use it
            return(this.findOne({
                where:{
                    username:username
                },
                include:[
                    sequelize.models.post
                ],
                order:[
                    [sequelize.models.post,'createdAt', 'DESC']
                ] 
            }));
        }
    },
    getterMethods: {
      url: function() {
            return(`/users/${this.username}`);
              },
      imgUrl: function(){
          return(`https://s3.amazonaws.com/instaclone-june-2017/users/${this.id}`);
      },
      imgThumb: function(){
          return(`${this.imgUrl}-thumbnail`);
        }
      } 
  });
  return(User);
};
