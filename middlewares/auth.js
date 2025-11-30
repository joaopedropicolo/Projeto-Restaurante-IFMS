const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.json({ mensagem: "Token não enviado", erro: true });

  jwt.verify(token, "segredo", (err, decoded) => {
    if (err)
      return res.json({ mensagem: "Token inválido", erro: true });

    req.usuarioId = decoded.id;
    req.usuarioTipo = decoded.tipo;
    next();
  });
};
