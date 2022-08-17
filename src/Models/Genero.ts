import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Genero = sequelize.define('Genero', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Genero;
