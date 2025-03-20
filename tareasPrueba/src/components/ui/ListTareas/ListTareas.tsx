import { useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from './ListTareas.module.css';
import { CardList } from '../CardList/CardList';
import { Modal } from '../Modal/Modal';
import { ITarea } from '../../../types/ITareas';
import { useTareas } from '../../../hooks/useTareas';
import { ViewDataModal } from '../ViewDataModal/ViewDataModal';

export const ListTareas = () => {
	const setTareaActiva = tareaStore((state) => state.setTareaActiva);

	const { getTareas, tarea } = useTareas();

	useEffect(() => {
		getTareas();
	}, []);

	const [openModalTarea, setOpenModalTarea] = useState(false);

	const handleOpenModal = (tarea: ITarea) => {
		setTareaActiva(tarea);
		setOpenModalTarea(true);
	};

	const [selectedTarea, setSelectedTarea] = useState<ITarea | null>(null);

	const handleSelectTarea = (tarea: ITarea) => {
		setTareaActiva(tarea);
		setSelectedTarea(tarea);
	};

	const handleCloseViewModal = () => {
		setTareaActiva(null)
		setSelectedTarea(null);
	};

	const handleCloseModal = () => {
		setTareaActiva(null);
		setOpenModalTarea(false);
	};

	return (
		<>
			<div className={styles.containerPrincipalListTareas}>
				<div className={styles.containerList}>
					{tarea.length > 0 ? (
						tarea.map((el) => (
							<CardList
								handleOpenModalEdit={handleOpenModal}
								tarea={el}
								handleSelectedTarea={handleSelectTarea}
							/>
						))
					) : (
						<div>
							<h3>No hay tareas</h3>
						</div>
					)}
				</div>
				<div className={styles.containerTitleAndButton}>
					<button
						onClick={() => {
							setOpenModalTarea(true);
						}}>
						Agregar tarea
					</button>
				</div>
			</div>
			{openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
			{selectedTarea && (
				<ViewDataModal handleCloseViewModal={handleCloseViewModal} />
			)}
		</>
	);
};
