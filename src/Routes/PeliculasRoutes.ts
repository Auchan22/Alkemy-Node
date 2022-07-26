import express from 'express';
import {
  createPelicula,
  getPeliculaById,
  getPeliculas,
} from '../Controllers/peliculasController';

const router = express.Router();

router
  .get('/', getPeliculas)
  .get('/:id', getPeliculaById)
  .post('/crear', createPelicula);

export default router;
