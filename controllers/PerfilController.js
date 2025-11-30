const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PerfilController {
  static async ver(req, res) {
    const user = await prisma.usuario.findUnique({
      where: { id: req.usuarioId },
      select: { id: true, nome: true, email: true, tipo: true }
    });

    return res.json({ mensagem: "OK", erro: false, usuario: user });
  }

  static async atualizar(req, res) {
    const { nome, email } = req.body.usuario;

    await prisma.usuario.update({
      where: { id: req.usuarioId },
      data: { nome, email }
    });

    return res.json({ mensagem: "Perfil atualizado!", erro: false });
  }

  static async todos(req, res) {
    const users = await prisma.usuario.findMany({
      select: { id: true, nome: true, email: true, tipo: true }
    });

    return res.json({ mensagem: "OK", erro: false, usuarios: users });
  }
}

module.exports = PerfilController;
