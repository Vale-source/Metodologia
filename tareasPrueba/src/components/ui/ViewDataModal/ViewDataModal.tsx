import { FC } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from '../Modal/Modal.module.css';

type IViewDataModal = {
	handleCloseViewModal: VoidFunction;
};

export const ViewDataModal: FC<IViewDataModal> = ({
	handleCloseViewModal,
}) => {
	const tareaActiva = tareaStore((state) => state.tareaActiva);

	return (
		<div className={styles.containerPrincipalModal}>
			<div className={styles.contentPopUp}>
				<h2>{tareaActiva?.titulo}</h2>
				<p>{tareaActiva?.id}</p>
				<p>{tareaActiva?.descripcion}</p>
				<p>{tareaActiva?.fechaLimite}</p>
				<button onClick={handleCloseViewModal}>Cerrar</button>
			</div>
		</div>
	);
};
