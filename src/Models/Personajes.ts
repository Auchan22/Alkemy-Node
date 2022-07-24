import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

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
});

export default Personaje;
