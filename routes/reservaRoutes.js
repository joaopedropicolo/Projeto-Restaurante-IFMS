const express = require("express");
const router = express.Router();
const ReservaController = require("../controllers/ReservaController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.post("/novo", auth, ReservaController.nova);
router.post("/", auth, ReservaController.minhas);
router.delete("/", auth, ReservaController.cancelar);
router.get("/list", auth, isAdmin, ReservaController.listarPorData);

module.exports = router;
