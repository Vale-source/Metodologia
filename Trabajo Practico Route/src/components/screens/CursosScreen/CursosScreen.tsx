import { useEffect, useState } from "react";
import { getCursos } from "../../../http/api";
import { CursosCard } from "../../ui/CursosCard";
import { ICursos } from "../../../types/ICursos";
import stylesCursos from "./CursosScreen.module.css";

export const CursosScreen = () => {
    const [cursos, setCursos] = useState<ICursos[]>([]);

    useEffect(() => {
        const cursosData = async () => {
            const getCursosData = await getCursos();
            setCursos(getCursosData);
			console.log(getCursosData)
        };
        cursosData();
    }, []);

    return (
        <div className={stylesCursos.container}>
            <div className={stylesCursos.content}>
                <h3>Cursos</h3>
                <div className={stylesCursos.list}>
                    {cursos.map((curso) => (
                        <CursosCard key={curso.id} cursos={curso} />
                    ))}
                </div>
            </div>
        </div>
    );
};