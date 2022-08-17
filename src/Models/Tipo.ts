import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const Tipo = sequelize.define('Tipo', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Tipo;
