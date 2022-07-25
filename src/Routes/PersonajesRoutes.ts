import express from 'express';
import {
  getPersonajes,
  getPersonajeById,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
} from '../Controllers/personajesController';

const router = express.Router();

router
  .get('/', getPersonajes)
  .get('/:id', getPersonajeById)
  .post('/', createPersonaje)
  .put('/:id', updatePersonaje)
  .delete('/:id', deletePersonaje);

export default router;
