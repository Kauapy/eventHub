const express = require("express")
const router = express.Router()
const eventoController = require("../controllers/eventosController")
const authMiddleware = require("../middlewares/authMiddleware")
const checkRole = require("../middlewares/checkRole")

router.use(authMiddleware)        
const checkRole = require("../middlewares/checkRole")   

router.get('/', eventoController.listar)
router.get('/:id', eventoController.buscarUm)
router.post('/', eventoController.criar)
router.put('/:id', eventoController.atualizar)
router.patch('/:id/status', eventoController.atualizarStatus)
router.delete('/:id', eventoController.deletar)
router.get('/:id/disponibilidade', eventoController.disponibilidade)

module.exports = router
