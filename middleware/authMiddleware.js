const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Obtém o token do cabeçalho da solicitação
  const token = req.header('Authorization');

  // Verifica se o token está presente
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, 'secreto'); // Utilize a mesma chave secreta usada para criar os tokens

    // Adiciona o ID do usuário ao objeto da solicitação para uso posterior
    req.userId = decoded.userId;

    // Chama a próxima função (controlador ou próximo middleware)
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
