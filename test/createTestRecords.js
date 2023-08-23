const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const sequelize = require('../db/connection'); 

// Função para criar registros de teste
async function createTestRecords() {
  // Sincronize os modelos com o banco de dados (se necessário)
  await sequelize.sync();

  // Crie registros de teste
  const newUser = await User.create({ username: 'testuser', password: 'testpass' });

  const newPost = await Post.create({
    title: 'Test Post',
    content: 'This is a test post content.',
    authorId: newUser.id
  });

  const newComment = await Comment.create({
    content: 'This is a test comment.',
    authorId: newUser.id,
    postId: newPost.id
  });

  const newLike = await Like.create({
    // Dados da curtida, se necessário
    userId: newUser.id,
    postId: newPost.id
  });

  // Exiba os registros criados
  console.log('User:', newUser.toJSON());
  console.log('Post:', newPost.toJSON());
  console.log('Comment:', newComment.toJSON());
  console.log('Like:', newLike.toJSON());
}

// Chame a função para criar registros de teste
createTestRecords()
  .then(() => {
    console.log('Test records created successfully.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error creating test records:', error);
    process.exit(1);
  });
