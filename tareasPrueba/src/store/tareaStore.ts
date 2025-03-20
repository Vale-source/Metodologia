import { create } from 'zustand';
import { ITarea } from '../types/ITareas';

interface ITareaStore {
	tarea: ITarea[];
	tareaActiva: ITarea | null;
	setTareaActiva: (tareaActiva: ITarea | null) => void;
	setArrayTareas: (arrayDeTareas: ITarea[]) => void;
	agregarNuevaTarea: (nuevaTarea: ITarea) => void;
	editarUnaTarea: (tareaEditada: ITarea) => void;
	eliminarUnaTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
	tarea: [],
	tareaActiva: null,
	setTareaActiva: (tareaActivaIn) =>
		set(() => ({ tareaActiva: tareaActivaIn })),

	setArrayTareas: (arrayDeTareas) => set(() => ({ tarea: arrayDeTareas })),

	agregarNuevaTarea: (nuevaTarea) =>
		set((state) => ({
			tarea: [...state.tarea, nuevaTarea],
		})),

	editarUnaTarea: (tareaEditada) =>
		set((state) => {
			const arregloTareas = state.tarea.map((tarea) =>
				tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea,
			);
			return { tarea: arregloTareas };
		}),

	eliminarUnaTarea: (idTarea) =>
		set((state) => {
			const arregloTareas = state.tarea.filter(
				(tarea) => tarea.id !== idTarea,
			);
			return { tarea: arregloTareas };
		}),
}));
