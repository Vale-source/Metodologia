import { ICursos } from "../types/ICursos"

export const getCursos = async (): Promise<ICursos[]> => {
    const response = await fetch("http://localhost:3000/cursos")
    const data = await response.json()
    return data
}

export const getCursosById = async (id: string): Promise<ICursos | null> => {
    const response = await fetch(`http://localhost:3000/cursos`);
    const data = await response.json();
    const curso = data.find((curso: ICursos) => String(curso.id) === id);
    return curso || null;
}