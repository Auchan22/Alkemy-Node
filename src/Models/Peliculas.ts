import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Pelicula = sequelize.define('Pelicula', {
  img: {
    type: DataTypes.STRING,
  },
  titulo: {
    type: DataTypes.STRING,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
  },
  calificacion: {
    type: DataTypes.INTEGER,
  },
});

export default Pelicula;
