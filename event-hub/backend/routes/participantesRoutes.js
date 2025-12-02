const express = require('express')
const router = express.Router()
const controller = require('../controllers/participantesController')
const auth = require('../middlewares/authMiddleware')
const { permitirPerfis } = require('../middlewares/checkRole')

router.use(auth)

router.get('/:id/historico', permitirPerfis('admin', 'organizador'), controller.historico)
router.get('/', permitirPerfis('admin', 'organizador'), controller.listar)
router.get('/:id', permitirPerfis('admin', 'organizador'), controller.buscarUm)
router.post('/', permitirPerfis('admin', 'organizador'), controller.criar)
router.put('/:id', permitirPerfis('admin', 'organizador'), controller.atualizar)
router.delete('/:id', permitirPerfis('admin', 'organizador'), controller.deletar)

module.exports = router