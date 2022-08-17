import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Film = sequelize.define('Film', {
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    values: ['1', '2', '3', '4', '5'],
    allowNull: false,
  },
  tipo_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  genero_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
});

export default Film;
