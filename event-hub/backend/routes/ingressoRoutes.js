const express = require('express')
const router = express.Router()
const ingressosController = require('../controllers/ingressosController')
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require("../middlewares/checkRole")


router.use(authMiddleware)


router.get('/evento/:id', ingressosController.ingressosEvento)
router.get('/participante/:id', ingressosController.ingressosParticipante)
router.get('/', ingressosController.listarIngressos)
router.get('/:id', ingressosController.buscarIngresso)
router.post('/', ingressosController.comprarIngresso)
router.patch('/:id/checkin', checkRole("organizador"), ingressosController.checkinIngresso)
router.patch('/:id/cancelar', checkRole("organizador"), ingressosController.cancelarIngresso)

module.exports = router
