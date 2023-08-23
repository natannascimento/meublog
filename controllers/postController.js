// controllers/postController.js
const Post = require('../models/Post');
const User = require('../models/User');

async function createPost(req, res) {
    const { title, content } = req.body;
  
    try {
      const newPost = await Post.create({
        title,
        content,
        authorId: req.userId, // ID do usuário autenticado
      });
  
      // Atualiza a linha do tempo do autor do post
      const user = await User.findByPk(req.userId);
      user.addPost(newPost);
  
      return res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async function updatePost(req, res) {
    const postId = req.params.postId;
    const { title, content } = req.body;
  
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Verifica se o usuário autenticado é o autor do post
      if (post.authorId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      // Atualiza as propriedades do post
      post.title = title;
      post.content = content;
      await post.save();
  
      return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async function deletePost(req, res) {
    const postId = req.params.postId;
  
    try {
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Verifica se o usuário autenticado é o autor do post
      if (post.authorId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      await post.destroy();
  
      return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  async function getPosts(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] },
          // ... outros includes necessários
        ],
      });
  
      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

async function likePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Atualiza o número de curtidas do post
    post.likes += 1;
    await post.save();

    return res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function unlikePost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Atualiza o número de curtidas do post
    post.likes -= 1;
    await post.save();

    return res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createPost, updatePost, deletePost, getPosts, likePost, unlikePost };

// Implemente funções para criar, atualizar, deletar e buscar posts
// Lembre-se de incluir a lógica para atualizar automaticamente a linha do tempo e o número de curtidas
