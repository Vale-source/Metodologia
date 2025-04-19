import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
	nombre: Yup.string()
		.required('El nombre es obligatorio')
		.min(3, 'El nombre debe tener al menos 3 caracteres'),

	correo: Yup.string()
		.required('El correo es obligatorio')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'El correo no es válido',
		),

	contraseña: Yup.string()
		.required('La contraseña es obligatoria')
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),

	repetirContraseña: Yup.string()
		.required('Repetir la contraseña es obligatorio')
		.oneOf([Yup.ref('contraseña')], 'Las contraseñas no coinciden'),
});
