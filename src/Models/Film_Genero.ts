import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Film_Genero = sequelize.define('Film_Genero', {
  genero_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  film_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
});

export default Film_Genero;
