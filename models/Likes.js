const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User');
const Post = require('./Post');

const Like = sequelize.define('Like', {
  
});

// Relações
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

module.exports = Like;

