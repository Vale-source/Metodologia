import { FC } from 'react';
import { ITarea } from '../../../types/ITareas';
import styles from './CardList.module.css';
import { useTareas } from '../../../hooks/useTareas';

type ICardList = {
	tarea: ITarea;
	handleOpenModalEdit: (tarea:ITarea) => void
	handleSelectedTarea: (tarea:ITarea) => void
};

export const CardList: FC<ICardList> = ({ tarea, handleOpenModalEdit, handleSelectedTarea }) => {

	const { borrarTarea } = useTareas()

	const eliminarTarea = () => {
		borrarTarea(tarea.id!)
	}

	const editarTarea = () => {
		handleOpenModalEdit(tarea)
	}


	return (
		<div className={styles.containerCard} >
			<div>
				<h3 onClick={() => handleSelectedTarea(tarea)}>{tarea.titulo}</h3>
				<p>{tarea.descripcion}</p>
				<p>
					<b>{tarea.fechaLimite}</b>
				</p>
			</div>

			<div className={styles.containerButton}>
				<button onClick={eliminarTarea}>Eliminar</button>
				<button onClick={editarTarea}>Editar</button>
			</div>
		</div>
	);
};
