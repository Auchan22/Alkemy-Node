import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initDB } from './utils/database';
import PersonajesRoutes from './Routes/PersonajesRoutes';
import PeliculasRoutes from './Routes/PeliculasRoutes';
import GenerosRoutes from './Routes/GenerosRoutes';

dotenv.config();

initDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello world aaaA');
});

app.use('/api/characters', PersonajesRoutes);
app.use('/api/movies', PeliculasRoutes);
app.use('/api/genres', GenerosRoutes);
