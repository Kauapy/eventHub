import express from 'express';
import authController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.perfil);
router.post('/logout', authMiddleware, authController.logout);

export default router;
