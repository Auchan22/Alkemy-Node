import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import Pelicula from './Film';

const Personaje = sequelize.define('Personaje', {
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  peso: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  historia: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pelicula_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

export default Personaje;
