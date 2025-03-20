import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { tareaStore } from '../../../store/tareaStore';
import styles from './Modal.module.css';
import { ITarea } from '../../../types/ITareas';
import { useTareas } from '../../../hooks/useTareas';

type IModal = {
	handleCloseModal: VoidFunction;
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
	const tareaActiva = tareaStore((state) => state.tareaActiva);
	const setTareaActiva = tareaStore((state) => state.setTareaActiva)

	const { crearTarea, modificarTarea } = useTareas();

	const initialState: ITarea = {
		titulo: '',
		descripcion: '',
		fechaLimite: '',
	};

	const [formValues, setFormValues] = useState<ITarea>(initialState);

	useEffect(() => {
		if (tareaActiva) setFormValues(tareaActiva);
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [`${name}`]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (tareaActiva) {
			modificarTarea(formValues);
		} else {
			crearTarea({ ...formValues, id: new Date().toDateString() });
		}
		setTareaActiva(null)
		handleCloseModal()
	};

	return (
		<div className={styles.containerPrincipalModal}>
			<div className={styles.contentPopUp}>
				<div>
					<h3>{tareaActiva ? 'Editar Tarea' : 'Crear Tarea'}</h3>
				</div>
				<form className={styles.containerForm} onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							required
							name="titulo"
							value={formValues.titulo}
							onChange={handleChange}
							autoComplete="off"
							title="Título de la tarea"
							placeholder="Ingrese el título de la tarea"
						/>
						<textarea
							name="descripcion"
							required
							value={formValues.descripcion}
							onChange={handleChange}
							title="Descripción de la tarea"
							placeholder="Ingrese la descripción de la tarea"
						/>
						<input
							type="date"
							required
							value={formValues.fechaLimite}
							onChange={handleChange}
							name="fechaLimite"
							autoComplete="off"
							title="Fecha de la tarea"
							placeholder="Selecciona una fecha"
						/>
					</div>

					<div className={styles.buttonCard}>
						<button onClick={handleCloseModal}>Cancelar</button>

						<button type="submit">
							{tareaActiva ? 'Editar Tarea' : 'Crear Tarea'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
