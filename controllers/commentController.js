// controllers/commentController.js
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User'); // Importe o modelo User se você não tiver feito isso ainda

async function createComment(req, res) {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await Comment.create({
      content,
      postId,
      authorId: req.userId, // ID do usuário autenticado
    });

    // Atualiza o número de comentários na postagem
    post.comments += 1;
    await post.save();

    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const { content } = req.body;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Verifica se o usuário autenticado é o autor do comentário
    if (comment.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Atualiza o conteúdo do comentário
    comment.content = content;
    await comment.save();

    return res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteComment(req, res) {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Verifica se o usuário autenticado é o autor do comentário
    if (comment.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await comment.destroy();

    // Atualiza o número de comentários na postagem
    const post = await Post.findByPk(comment.postId);
    if (post) {
      post.comments -= 1;
      await post.save();
    }

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCommentsByPost(req, res) {
  const postId = req.params.postId;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createComment, updateComment, deleteComment, getCommentsByPost };
