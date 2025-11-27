const express = require("express")
const router = express.Router()
const eventoController = require("../controllers/eventosController")
const authMiddleware = require("../middlewares/authMiddleware")

router.use(authMiddleware)

router.get('/', eventoController.listar)
router.get(':/id', eventoController.buscarUm)
router.post('/', eventoController.atualizar)
router.put('/:id', eventoController.atualizar)
router.patch('/:id/status', eventoController.atualizarStatus)
router.delete('/:id', eventoController.deletar)
router.get('/:id/disponibilidade', eventoController.disponibilidade)

module.exports = router