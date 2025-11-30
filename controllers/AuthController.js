const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AuthController {
  static async cadastro(req, res) {
    const { nome, email, password } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { email } });

    if (existe)
      return res.json({ mensagem: "Email já cadastrado!", erro: true });

    const hash = await bcrypt.hash(password, 10);

    await prisma.usuario.create({
      data: { nome, email, password: hash }
    });

    return res.json({ mensagem: "Cadastro realizado!", erro: false });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user)
      return res.json({ mensagem: "Usuário não encontrado", erro: true });

    const ok = await bcrypt.compare(password, user.password);

    if (!ok)
      return res.json({ mensagem: "Senha incorreta", erro: true });

    const token = jwt.sign(
      { id: user.id, tipo: user.tipo },
      "segredo",
      { expiresIn: "7d" }
    );

    return res.json({ mensagem: "Login realizado!", erro: false, token });
  }
}

module.exports = AuthController;
