module.exports = function (req, res, next) {
  if (req.usuarioTipo !== "adm") {
    return res.json({
      mensagem: "Apenas administradores podem acessar",
      erro: true
    });
  }

  next();
};
