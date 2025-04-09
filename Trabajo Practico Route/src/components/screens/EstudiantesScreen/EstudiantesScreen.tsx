import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCursosById } from '../../../http/api';
import { ICursos } from '../../../types/ICursos';
import styles from './EstudiantesScreen.module.css';

export const EstudiantesScreen = () => {
    const { id } = useParams();
    const [curso, setCurso] = useState<ICursos | null>(null);
    const [existId, setExistId] = useState(false);

    useEffect(() => {
        const fetchCurso = async () => {
            try {
                if (id) {
                    const cursoData = await getCursosById(id);
                    setExistId(true);
                    setCurso(cursoData);
                } else {
                    console.error('no se proporciono ningun ID');
                }
            } catch (error) {
                console.error('Error al obtener los cursos:', error);
            }
        };
        fetchCurso();
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.backContainer}>
                <Link to={'/'} className={styles.backLink}>
                    Volver
                </Link>
            </div>
            <div className={styles.header}>
                <h2>Alumnos de: {curso?.nombre}</h2>
            </div>
            <div className={styles.content}>
                <ul className={styles.list}>
                    {existId ? (
                        curso?.estudiantes?.map((estudiante) => (
                            <li key={estudiante.id} className={styles.item}>
                                <p>
                                    <strong>ID:</strong> {estudiante.id}
                                </p>
                                <p>
                                    <strong>Nombre:</strong> {estudiante.nombre}
                                </p>
                                <p>
                                    <strong>Edad:</strong> {estudiante.edad}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li className={styles.item}>
                            <p>No hay estudiantes para mostrar</p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};