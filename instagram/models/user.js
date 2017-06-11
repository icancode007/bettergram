'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username:
    {
      type:  DataTypes.STRING,
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
    phonenumber:
    {
      type:  DataTypes.STRING,
      allowNull: false,
      validate:  {
        notEmpty:  {
          msg:'Phone NUmber is required'
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
      type:  DataTypes.STRING,
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
    password:
    {
      type:  DataTypes.STRING,
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
      }
    } 
  });
  return(User);
};
