const Post = require('../models/Post');

function authorizationMiddleware(req, res, next) {
  const postId = req.params.postId;

  // Encontre o post pelo ID
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Verifique se o autor do post é o mesmo que o usuário autenticado
      if (post.authorId !== req.userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Se o autor for o mesmo, passe para o próximo middleware ou rota
      next();
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    });
}

module.exports = authorizationMiddleware;