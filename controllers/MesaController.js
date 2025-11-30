const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MesaController {
  static async nova(req, res) {
    const { codigo, n_lugares } = req.body;

    await prisma.mesa.create({
      data: { codigo, n_lugares }
    });

    return res.json({ mensagem: "Mesa cadastrada!", erro: false });
  }

  static async todas(req, res) {
    const mesas = await prisma.mesa.findMany();
    return res.json({ mensagem: "OK", erro: false, mesas });
  }

  static async disponibilidade(req, res) {
    const { data } = req.query;

    const mesas = await prisma.mesa.findMany({
      include: {
        reservas: {
          where: { data }
        }
      }
    });

    return res.json({ mensagem: "OK", erro: false, mesas });
  }
}

module.exports = MesaController;
