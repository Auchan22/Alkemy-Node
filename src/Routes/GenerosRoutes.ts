import express from 'express';
import { createGenero } from '../Controllers/generosController';

const router = express.Router();

router.post('/', createGenero);

export default router;
