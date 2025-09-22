const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

class UsuarioController {

  static async cadastrar(req, res) {
    const { nome, email, password, tipo } = req.body;


    if (!nome || !email || !password) {
      return res.status(400).json({ msg: "Nome, email e senha são obrigatórios!" });
    }


    const usuarioExistente = await client.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ msg: "Este email já está cadastrado!" });
    }


    const salt = bcryptjs.genSaltSync(8);
    const hashSenha = bcryptjs.hashSync(password, salt);

    try {

  const usuario = await client.usuario.create({
    data: {
      nome: "Renanananan",
      email: "renan@gmail.com",
      password: "$2b$08$n.0QHHUbEKZFR7HREMZWdunU5cR8ngGIw0L.sXgtyfyS.AICWl1y.", // Hash da senha
      tipo: "usuario",
    },
  });

  res.json({
    usuarioId: usuario.id,
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ msg: "Erro ao criar o usuário!" });
}

  }

  // Função de login
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios!" });
    }

    const usuario = await client.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const senhaCorreta = bcryptjs.compareSync(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(400).json({ msg: "Senha incorreta!" });
    }


    const token = jwt.sign({ id: usuario.id }, process.env.SENHA_SERVIDOR, {
      expiresIn: "2h",
    });

    res.json({
      msg: "Autenticado com sucesso!",
      token: token,
    });
  }

  static async verificaAutenticacao(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.SENHA_SERVIDOR, (err, payload) => {
        if (err) {
          return res.status(401).json({ msg: "Token inválido!" });
        }

        req.usuarioId = payload.id;
        next();
      });
    } else {
      return res.status(401).json({ msg: "Token não encontrado" });
    }
  }

  static async verificaIsAdmin(req, res, next) {
    if (!req.usuarioId) {
      return res.status(401).json({ msg: "Você não está autenticado!" });
    }

    const usuario = await client.usuario.findUnique({
      where: {
        id: req.usuarioId,
      },
    });

    if (!usuario || usuario.tipo !== "admin") {
      return res.status(403).json({ msg: "Acesso negado! Você não é um administrador." });
    }

    next();
  }
}

module.exports = UsuarioController;