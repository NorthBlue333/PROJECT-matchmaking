'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsTo(models.User, {foreignKey: 'userId'})
    Game.belongsTo(models.User, {foreignKey: 'opponentId'})
  };
  return Game;
};