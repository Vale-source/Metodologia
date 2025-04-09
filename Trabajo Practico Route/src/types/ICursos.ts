import { IEstudiantes } from "./IEstudiantes";

export interface ICursos {
    id: number | null,
    nombre: string | null,
    estudiantes: IEstudiantes[] | null
}