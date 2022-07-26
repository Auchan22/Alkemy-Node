import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import Pelicula from './Peliculas';

const Personaje = sequelize.define('Personaje', {
  img: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  peso: {
    type: DataTypes.REAL,
  },
  historia: {
    type: DataTypes.TEXT,
  },
  pelicula_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
});

export default Personaje;

Personaje.belongsToMany(Pelicula, {
  through: 'personajePelicula',
  as: 'pelicula',
  foreignKey: 'personajeId',
});
