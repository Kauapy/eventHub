const express = require('express')
const router = express.Router()
const controller = require('../controllers/participantesController')

router.get('/', controller.listar)
router.get('/:id', controller.buscarUm)
router.post('/', controller.criar)
router.put('/:id', controller.atualizar)
router.delete('/:id', controller.deletar)

router.get('/:id/historico', controller.historico)

module.exports = router