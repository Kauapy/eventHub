import express from 'express';
import ingressosController from '../controllers/ingressoController.js';
import auth from '../middlewares/authMiddleware.js';
import { permitirPerfis } from '../middlewares/checkRole.js';

const router = express.Router();

router.use(auth);

router.get('/evento/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.ingressosEvento);
router.get('/participante/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.ingressosParticipante);
router.get('/', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.listarIngressos);
router.post('/', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.comprarIngresso);
router.get('/:id', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.buscarIngresso);
router.patch('/:id/checkin', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.checkinIngresso);
router.patch('/:id/cancelar', permitirPerfis('admin', 'organizador', 'vendedor'), ingressosController.cancelarIngresso);

export default router;
