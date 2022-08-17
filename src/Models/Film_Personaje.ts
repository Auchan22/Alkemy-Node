import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Film_Personaje = sequelize.define('Film_Personaje', {
  personaje_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Film_Personaje;
