import { useShallow } from 'zustand/shallow';
import { tareaStore } from '../store/tareaStore';
import {
	editarTarea,
	eliminarTareaPorID,
	getAllTareas,
	postNuevaTareas,
} from '../http/tarea';
import { ITarea } from '../types/ITareas';
import Swal from 'sweetalert2';

export const useTareas = () => {
	const {
		tarea,
		setArrayTareas,
		agregarNuevaTarea,
		eliminarUnaTarea,
		editarUnaTarea,
	} = tareaStore(
		useShallow((state) => ({
			tarea: state.tarea,
			setArrayTareas: state.setArrayTareas,
			agregarNuevaTarea: state.agregarNuevaTarea,
			eliminarUnaTarea: state.eliminarUnaTarea,
			editarUnaTarea: state.editarUnaTarea,
		})),
	);

	const getTareas = async () => {
		const data = await getAllTareas();
		if (data) setArrayTareas(data);
	};

	const crearTarea = async (nuevaTarea: ITarea) => {
		agregarNuevaTarea(nuevaTarea);
		try {
			await postNuevaTareas(nuevaTarea);
			Swal.fire('Exito', 'Tarea creada correctamente', 'success');
		} catch (error) {
			eliminarUnaTarea(nuevaTarea.id!);
			console.error(error);
		}
	};

	const modificarTarea = async (tareaEditada: ITarea) => {
		const estadoPrevio = tarea.find((el) => el.id === tareaEditada.id);

		editarUnaTarea(tareaEditada);

		try {
			await editarTarea(tareaEditada);
			Swal.fire('Exito', 'Tarea creada actualizada', 'success');
		} catch (error) {
			if (estadoPrevio) editarUnaTarea(estadoPrevio);
			console.error(error);
		}
	};

	const borrarTarea = async (idTarea: string) => {
		const estadoPrevio = tarea.find((el) => el.id === idTarea);
		const confirmar = await Swal.fire({
			title: '¿Estas seguro?',
			text: 'Esta accion no se puede deshacer',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Si, eliminar',
			cancelButtonText: 'Cancelar',
		});

		if (!confirmar.isConfirmed) return;
		eliminarUnaTarea(idTarea);

		try {
			await eliminarTareaPorID(idTarea);
			Swal.fire('Eliminado', 'Tarea creada eliminada correctamente', 'success');
		} catch (error) {
			if (estadoPrevio) agregarNuevaTarea(estadoPrevio);
			console.error(error);
		}
	};

	return {
		getTareas,
		crearTarea,
		modificarTarea,
		borrarTarea,
		tarea,
	};
};
