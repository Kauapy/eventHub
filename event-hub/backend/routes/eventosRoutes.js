import express from "express";
import eventoController from "../controllers/eventosController.js";
import auth from "../middlewares/authMiddleware.js";
import { permitirPerfis } from "../middlewares/checkRole.js";

const router = express.Router();

router.use(auth);

router.get('/:id/disponibilidade', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.disponibilidade);
router.get('/', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.listar);
router.get('/:id', permitirPerfis('admin', 'organizador', 'vendedor'), eventoController.buscarUm);
router.post('/', permitirPerfis('admin', 'organizador'), eventoController.criar);
router.put('/:id', permitirPerfis('admin', 'organizador'), eventoController.atualizar);
router.patch('/:id/status', permitirPerfis('admin', 'organizador'), eventoController.atualizarStatus);
router.delete('/:id', permitirPerfis('admin'), eventoController.deletar);

export default router;
