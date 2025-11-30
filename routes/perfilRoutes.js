const express = require("express");
const router = express.Router();
const PerfilController = require("../controllers/PerfilController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", auth, PerfilController.ver);
router.patch("/", auth, PerfilController.atualizar);
router.get("/todos", auth, isAdmin, PerfilController.todos);

module.exports = router;
