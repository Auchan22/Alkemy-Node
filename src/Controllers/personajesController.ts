import Personaje from '../Models/Personajes';
import { Request, Response } from 'express';
import { Personaje as PersonajeInterface } from '../Types/Personaje';
import { sequelize } from '../utils/database';
import Film_Personaje from '../Models/Film_Personaje';
import Film from '../Models/Film';
import type { Film as FilmInterface } from '../Types';

const findPersonaje = async (id: string) => {
  const searchPersonaje = await Personaje.findOne({
    where: { id: id },
    attributes: ['id', 'img', 'nombre', 'edad', 'peso', 'historia'],
  });
  // console.log(searchPersonaje);
  const allMovies = await Film_Personaje.findAll({
    where: { personaje_id: id },
  });
  // console.log(allMovies);

  let arrMoviesId: number[] = [];
  allMovies.map((el) => arrMoviesId.push(el.getDataValue('film_id')));
  // console.log(arrMoviesId);

  let movies: (FilmInterface | string)[] = await Promise.all(
    arrMoviesId.map(async (el) => {
      return await Film.findOne({ where: { id: el } }).then((res) => {
        if (res?.toJSON() !== undefined) {
          return res?.toJSON();
        } else {
          return `La pélicula con el id ${el} no existe aún`;
        }
      });
    }),
  );

  // console.log(movies);
  let data = { ...searchPersonaje?.toJSON(), movies };
  return data;
};

const getPersonajes = async (req: Request, res: Response) => {
  try {
    const { name, age, movies } = req.query;

    if (name) {
      const p = await Personaje.findOne({ where: { nombre: name } });
      if (!p)
        return res
          .status(400)
          .json({ msg: 'No se encontró el Personaje con ese nombre' });

      let result = findPersonaje(p.getDataValue('id'));
      return res.status(200).json(await result);
    }

    if (age) {
      const p = await Personaje.findAll({ where: { edad: age } });
      if (!p)
        return res
          .status(400)
          .json({ msg: 'No se encontró el Personaje con esa edad' });
      return res.status(200).json(p);
    }

    if (movies) {
      const p = await Personaje.findAll({ where: { pelicula_id: movies } });
      if (!p)
        return res
          .status(400)
          .json({ msg: 'No se encontró el Personaje con esa edad' });
      return res.status(200).json(p);
    }

    const personajes = await Personaje.findAll({
      attributes: ['img', 'nombre'],
    });

    if (!personajes)
      return res
        .status(400)
        .json({ msg: 'No se pudieron encontrar personajes' });

    return res.status(200).json(personajes);
  } catch (error) {
    return res.status(400).json({ msg: 'Hubo un error', error });
    console.error(error);
  }
};

const getPersonajeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = findPersonaje(id);
    // console.log(await result);

    if (!result)
      return res.status(400).json({ msg: 'No se encontró el personaje' });

    return res.status(200).json(await result);
  } catch (error) {
    return res.status(400).json({ error });
    console.error(error);
  }
};

const createPersonaje = async (req: Request, res: Response) => {
  try {
    const { nombre, pelicula_id } = req.body;
    const existePersonaje = await Personaje.findOne({ where: { nombre } });

    if (existePersonaje) {
      const personajeId = await existePersonaje.getDataValue('id');

      const asocRepeated = await Film_Personaje.findAll({
        where: { personaje_id: personajeId, film_id: pelicula_id },
      });

      if (asocRepeated.length > 0) {
        return res
          .status(404)
          .json({ msg: 'Ya esta asignada esta pelicula con el Personaje' });
      } else {
        const newAsoc = await Film_Personaje.create({
          personaje_id: personajeId,
          film_id: pelicula_id,
        });

        const response = { ...existePersonaje.toJSON(), pelicula_id };

        return res.status(200).json({
          msg: `Se asigno de manera correcta otra pelicula al personaje ${nombre}`,
          response,
        });
      }
    } else {
      const data = req.body;

      if (data.nombre === '' || data.img === '')
        return res
          .status(400)
          .json({ msg: 'Los campos nombre e imagen son obligatorios' });

      const newPersonaje = await Personaje.create(data);

      const newPersonajeId = await newPersonaje.getDataValue('id');
      const newPersonajeMovieId = await newPersonaje.getDataValue(
        'pelicula_id',
      );

      const newAsoc = await Film_Personaje.create({
        personaje_id: newPersonajeId,
        film_id: newPersonajeMovieId,
      });

      if (!newPersonaje)
        return res.status(400).json({ msg: 'No se pudo crear el personaje' });

      return res
        .status(200)
        .json({ msg: 'Personaje creado correctamente', data });
    }
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

const updatePersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const personaje = await Personaje.findOne({ where: { id } });

    if (!personaje)
      return res
        .status(400)
        .json({ msg: `No se encontro el personaje con el id ${id}` });

    const data: PersonajeInterface = req.body;

    if (
      data.nombre === '' ||
      !data.edad ||
      !data.peso ||
      data.historia === ''
    ) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const updatedPersonaje = await Personaje.update(data, { where: { id } });

    if (!updatedPersonaje)
      return res
        .status(400)
        .json({ msg: 'No se pudo actualizar el personaje' });

    return res
      .status(200)
      .json({ msg: 'Personaje actualizado correctamente', data });
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

const deletePersonaje = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existe = await Personaje.findOne({ where: { id } });
    if (!existe) return res.status(400).json({ msg: 'El personaje no existe' });

    const personaje = await Personaje.destroy({ where: { id } });
    if (!personaje)
      return res.status(400).json({ msg: 'No se pudo eliminar el personaje' });

    return res
      .status(200)
      .json({ msg: 'Personaje eliminado de forma satisfactoria' });
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

export {
  getPersonajes,
  getPersonajeById,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
};
