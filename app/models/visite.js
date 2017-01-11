'use strict';
module.exports = function(sequelize, DataTypes) {
  var Visite = sequelize.define('Visite', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Visite;
};