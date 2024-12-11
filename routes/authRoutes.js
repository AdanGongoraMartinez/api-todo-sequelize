import express from 'express';
import { getAllUsers, login, register } from '../controllers/authController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/login', login);
router.post('/register', register);

export default router;
