import Personaje from '../Models/Personajes';
import { Request, Response } from 'express';
import { Personaje as PersonajeInterface } from '../Types/Personaje';

const getPersonajes = async (req: Request, res: Response) => {
  try {
    const { name, age } = req.query;

    if (name) {
      const p = await Personaje.findAll({ where: { nombre: name } });
      if (!p)
        return res
          .status(400)
          .json({ msg: 'No se encontró el Personaje con ese nombre' });
      return res.status(200).json(p);
    }

    if (age) {
      const p = await Personaje.findAll({ where: { edad: age } });
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
        .json({ msg: 'No sep udieron encontrar personajes' });

    return res.status(200).json(personajes);
  } catch (error) {
    return res.status(400).json({ msg: 'Hubo un error', error });
    console.error(error);
  }
};

const getPersonajeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const searchP = await Personaje.findOne({ where: { id } });

    if (!searchP)
      return res.status(400).json({ msg: 'No se encontró el personaje' });

    return res.status(200).json(searchP);
  } catch (error) {
    return res.status(400).json({ error });
    console.error(error);
  }
};

const createPersonaje = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const existePersonaje = await Personaje.findOne({ where: { nombre } });

    if (existePersonaje)
      return res.status(400).json({ msg: 'El personaje ya existe' });

    const data = req.body;

    if (data.nombre === '' || data.img === '')
      return res
        .status(400)
        .json({ msg: 'Los campos nombre e imagen son obligatorios' });

    const newPersonaje = await Personaje.create(data);
    if (!newPersonaje)
      return res.status(400).json({ msg: 'No se pudo crear el personaje' });

    return res
      .status(200)
      .json({ msg: 'Personaje creado correctamente', data });
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
