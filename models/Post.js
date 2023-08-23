const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./User');
const Comment = require('./Comment'); 
const Like = require('./Like');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// Relações
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });

Post.prototype.updateLikesCount = async function () {
  const count = await Like.count({ where: { PostId: this.id } });
  this.likesCount = count;
  await this.save();
};

module.exports = Post;
