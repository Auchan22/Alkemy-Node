import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Genero = sequelize.define('Pelicula', {
  nombre: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
  },
});

export default Genero;
