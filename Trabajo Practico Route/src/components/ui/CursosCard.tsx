import { FC } from "react";
import { ICursos } from "../../types/ICursos";
import { Link } from "react-router-dom";
import styles from "./CursosCard.module.css";

type CursoType = {
    cursos: ICursos;
};

export const CursosCard: FC<CursoType> = ({ cursos }) => {
    return (
        <Link to={`/curso/${cursos.id}`} className={styles.cardLink}>
            <div className={styles.cardContainer}>
                <p>
                    <strong>Nombre:</strong> {cursos.nombre}
                </p>
                <p>
                    <strong>ID:</strong> {cursos.id}
                </p>
                <p>
                    <strong>Alumnos:</strong> {cursos.estudiantes ? cursos.estudiantes.length : 0}
                </p>
            </div>
        </Link>
    );
};
