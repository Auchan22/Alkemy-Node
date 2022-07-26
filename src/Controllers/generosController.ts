import { Request, Response } from 'express';
import Genero from '../Models/Genero';

const createGenero = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newGenero = await Genero.create(data);

    return res.status(200).json({ msg: 'Genero creado', data });
  } catch (error) {
    return res.status(400).json(error);
    console.error(error);
  }
};

export { createGenero };
