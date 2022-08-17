export interface Film {
  id: number;
  img: string;
  titulo: string;
  fechaCreacion?: number;
  calificacion: number;
  tipo_id: number;
  genero_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}
