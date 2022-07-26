import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';

const TipoServicio = sequelize.define('TipoServicio', {
  desc: {
    type: DataTypes.STRING,
  },
});

export default TipoServicio;
import Pelicula from './Peliculas';
TipoServicio.hasMany(Pelicula, { as: 'peliculas' });
