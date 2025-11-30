const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ReservaController {
  static async nova(req, res) {
    const { data, n_pessoas, mesaId } = req.body;

    // Verifica se já tem reserva nessa data
    const existe = await prisma.reserva.findFirst({
      where: { mesaId, data }
    });

    if (existe)
      return res.json({
        mensagem: "Mesa já reservada nesta data!",
        erro: true
      });

    await prisma.reserva.create({
      data: {
        data,
        n_pessoas,
        mesaId,
        usuarioId: req.usuarioId
      }
    });

    return res.json({ mensagem: "Reserva realizada!", erro: false });
  }

  static async minhas(req, res) {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId: req.usuarioId },
      include: { mesa: true }
    });

    return res.json({ mensagem: "OK", erro: false, reservas });
  }

  static async cancelar(req, res) {
    const { reservaId } = req.body;

    const reserva = await prisma.reserva.findUnique({
      where: { id: reservaId }
    });

    if (!reserva || reserva.usuarioId !== req.usuarioId)
      return res.json({ mensagem: "Não autorizado!", erro: true });

    await prisma.reserva.delete({
      where: { id: reservaId }
    });

    return res.json({ mensagem: "Reserva cancelada!", erro: false });
  }

  static async listarPorData(req, res) {
    const { data } = req.query;

    const reservas = await prisma.reserva.findMany({
      where: { data },
      include: { mesa: true, usuario: true }
    });

    return res.json({ mensagem: "OK", erro: false, reservas });
  }
}

module.exports = ReservaController;
