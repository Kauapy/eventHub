const express = require('express')
const router = express.Router()
const ingressosController = require('../controllers/ingressoController')
const auth = require('../middlewares/authMiddleware')
const { permitirPerfis } = require('../middlewares/checkRole')

router.use(auth)

router.get('/evento/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.ingressosEvento)
router.get('/participante/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.ingressosParticipante)
router.get('/', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.listarIngressos)
router.post('/', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.comprarIngresso)
router.get('/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.buscarIngresso)
router.patch('/:id/checkin', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.checkinIngresso)
router.patch('/:id/cancelar', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.cancelarIngresso)

module.exports = router