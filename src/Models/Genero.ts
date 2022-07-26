import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Genero = sequelize.define('Genero', {
  nombre: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
});

export default Genero;

import Pelicula from './Peliculas';
// Genero.hasMany(Pelicula, { as: 'pelicula' });
