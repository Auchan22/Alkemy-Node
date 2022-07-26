import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/database';
import Genero from './Genero';
import Personaje from './Personajes';
import TipoServicio from './Tipo';

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
    values: ['1', '2', '3', '4', '5'],
  },
  genero_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
  tipo_id: {
    type: DataTypes.INTEGER.UNSIGNED,
  },
});

export default Pelicula;

Pelicula.belongsTo(TipoServicio, {
  foreignKey: 'tipoId',
  as: 'tipo',
});

Pelicula.belongsTo(Genero, { foreignKey: 'generoId', as: 'genero' });

Pelicula.belongsToMany(Personaje, {
  through: 'personajePelicula',
  as: 'personaje',
});
