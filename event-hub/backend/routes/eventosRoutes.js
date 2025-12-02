const express = require("express")
const router = express.Router()
const eventoController = require("../controllers/eventosController")
const auth = require("../middlewares/authMiddleware")
const { permitirPerfis } = require("../middlewares/checkRole")

router.use(auth)

router.get('/:id/disponibilidade', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.disponibilidade)
router.get('/', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.listar)
router.get('/:id', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.buscarUm)
router.post('/', permitirPerfis('admin', 'organizador'), eventoController.criar)
router.put('/:id', permitirPerfis('admin', 'organizador'), eventoController.atualizar)
router.patch('/:id/status', permitirPerfis('admin', 'organizador'), eventoController.atualizarStatus)
router.delete('/:id', permitirPerfis('admin'), eventoController.deletar)

module.exports = router