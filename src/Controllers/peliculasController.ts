import { Request, Response } from 'express';
import Genero from '../Models/Genero';
import Pelicula from '../Models/Film';
import { sequelize } from '../utils/database';
import Film_Genero from '../Models/Film_Genero';

const getPeliculas = async (req: Request, res: Response) => {
  try {
    const { name, genre, order } = req.query;

    if (order) {
      const peliculas = await Pelicula.findAll({
        order: [['id', `${order}`]],
      });
      return res.status(200).json(peliculas);
    }

    if (name) {
      const peliculas = await Pelicula.findOne({ where: { titulo: name } });
      if (!peliculas)
        return res
          .status(400)
          .json({ msg: 'La pelicula buscada no se encuentra cargada' });
      return res.status(200).json(peliculas);
    }

    // if (genre) {
    //   const peliculas = await Pelicula.findAll({ where: { titulo: name } });
    //   return res.status(200).json(peliculas);
    // }

    const peliculas = await Pelicula.findAll({
      attributes: ['img', 'titulo', 'fechaCreacion'],
    });

    if (!peliculas)
      return res.status(400).json({ msg: 'No existen peliculas' });
    return res.status(200).json(peliculas);
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

const getPeliculaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // const pelicula = await Pelicula.findOne({ where: { id } });
    const [pelicula, metadata] = await sequelize.query(
      'SELECT p.id, p.img, p.titulo, p.fechaCreacion, p.calificacion, g.nombre as genero FROM alkemydb.peliculas p inner join alkemydb.generos g on (p.genero_id = g.id)',
    );

    if (!pelicula)
      return res
        .status(400)
        .json({ msg: `No existe la pelicula con el id ${id}` });

    return res.status(200).json(pelicula);
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

const createPelicula = async (req: Request, res: Response) => {
  try {
    const { titulo } = req.body;

    const existe = await Pelicula.findOne({ where: { titulo } });
    if (existe) return res.status(400).json({ msg: 'La pelicula ya existe' });

    const data = req.body;

    const createdPelicula = await Pelicula.create(data);

    const newMovieId = await createdPelicula.getDataValue('id');
    const newMovieGeneroId = await createdPelicula.getDataValue('genero_id');

    const newAsoc = await Film_Genero.create({
      genero_id: newMovieGeneroId,
      film_id: newMovieId,
    });

    if (!createdPelicula)
      return res
        .status(400)
        .json({ msg: 'Hubo un error al crear la película' });
    return res
      .status(200)
      .json({ msg: 'La pelicula se creo de manera correcta', data });
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

export { getPeliculas, getPeliculaById, createPelicula };
