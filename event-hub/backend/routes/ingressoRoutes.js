const express = require('express')
const router = express.Router()
const ingressosController = require('../controllers/ingressosController')
const authMiddleware = require('../middlewares/authMiddleware')

router.use(authMiddleware)


router.get('/', ingressosController.listarIngressos)
router.post('/', ingressosController.comprarIngresso)
router.get('/:id', ingressosController.buscarIngresso)
router.patch('/:id/checkin', ingressosController.checkinIngresso)
router.patch('/:id/cancelar', ingressosController.cancelarIngresso)
router.get('/evento/:id', ingressosController.ingressosEvento)
router.get('/participante/:id', ingressosController.ingressosParticipante)

module.exports = router