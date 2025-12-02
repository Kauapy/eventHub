const express = require('express')
const router = express.Router()
const participantesController = require('../controllers/participantesController')
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require("../middlewares/checkRole")


router.use(authMiddleware)


router.get('/', participantesController.listarParticipantes)
router.get('/:id', participantesController.buscarParticipante)


router.post('/', checkRole("organizador"), participantesController.criarParticipante)
router.put('/:id', checkRole("organizador"), participantesController.atualizarParticipante)
router.delete('/:id', checkRole("organizador"), participantesController.deletarParticipante)

module.exports = router
