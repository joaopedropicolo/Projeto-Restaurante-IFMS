const express = require("express");
const router = express.Router();
const MesaController = require("../controllers/MesaController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/novo", auth, isAdmin, MesaController.nova);
router.get("/", MesaController.todas);
router.get("/disponibilidade", MesaController.disponibilidade);

module.exports = router;
