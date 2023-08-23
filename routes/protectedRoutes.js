const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorizationMiddleware = require('../middleware/authorizationMiddleware');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

// Rota protegida para criar um post
router.post('/posts', authMiddleware, authorizationMiddleware, postController.createPost);

// Rota protegida para atualizar um post
router.put('/posts/:postId', authMiddleware, authorizationMiddleware, postController.updatePost);

// Rota protegida para deletar um post
router.delete('/posts/:postId', authMiddleware, authorizationMiddleware, postController.deletePost);

// Rota protegida para buscar posts
router.get('/posts', authMiddleware, authorizationMiddleware, postController.getPosts);

// Rota protegida para criar um comentário
router.post('/posts/:postId/comments', authMiddleware, authorizationMiddleware, commentController.createComment);

// Rota protegida para atualizar um comentário
router.put('/comments/:commentId', authMiddleware, authorizationMiddleware, commentController.updateComment);

// Rota protegida para deletar um comentário
router.delete('/comments/:commentId', authMiddleware, authorizationMiddleware, commentController.deleteComment);

// Rota protegida para buscar comentários de um post
router.get('/posts/:postId/comments', authMiddleware, authorizationMiddleware, commentController.getCommentsByPost);


module.exports = router;
