import express from 'express';
import controller from '../controllers/participantesController.js';
import auth from '../middlewares/authMiddleware.js';
import { permitirPerfis } from '../middlewares/checkRole.js';

const router = express.Router();

router.use(auth);

router.get('/:id/historico', permitirPerfis('admin', 'organizador'), controller.historico);
router.get('/', permitirPerfis('admin', 'organizador'), controller.listar);
router.get('/:id', permitirPerfis('admin', 'organizador'), controller.buscarUm);
router.post('/', permitirPerfis('admin', 'organizador'), controller.criar);
router.put('/:id', permitirPerfis('admin', 'organizador'), controller.atualizar);
router.delete('/:id', permitirPerfis('admin', 'organizador'), controller.deletar);

export default router;
