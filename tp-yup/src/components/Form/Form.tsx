import { useEffect, useState } from "react";
import { formSchema } from "../../schemas/formSchema";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";
import Swal from "sweetalert2";

export const Form = () => {
	const [formData, setFormData] = useState({
		nombre: "",
		correo: "",
		contraseña: "",
		repetirContraseña: "",
	});

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		try {
			await formSchema.validateAt(name, { ...formData, [name]: value });
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		} catch (err: unknown) { //No me tomaba el tipo any para el error
			if (err instanceof Error) {
				setErrors((prev) => ({
					...prev,
					[name]: err.message,
				}));
			}
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await formSchema.validate(formData, { abortEarly: false });
			Swal.fire({
        title: "Formulario enviado",
        text: "Datos enviados correctamente",
        icon: "success"
      });
			setFormData({
				nombre: "",
				correo: "",
				contraseña: "",
				repetirContraseña: "",
			});
		} catch (err: unknown) {
			if (err instanceof Error && 'inner' in err && Array.isArray(err.inner)) {
				const newErrors: Record<string, string> = {};
				err.inner.forEach((error: { path: string; message: string }) => {
					newErrors[error.path] = error.message;
				});
				setErrors(newErrors);
			}
		}
	};

	const isFormValid = () => {
		const hasErrors = Object.keys(errors).length > 0;
		const hasEmptyFields = Object.values(formData).some(
			(value) => value.trim() === ""
		);
		return !hasErrors && !hasEmptyFields;
	};

	useEffect(() => {
		isFormValid();
	}, [formData]);

	const [errors, setErrors] = useState<Record<string, string>>({});

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<div className={styles.formContent}>
					<Input
						Inputname="nombre"
						Inputlabel="Nombre"
						Inputtype="text"
						Inputvalue={formData.nombre}
						InputhandleChange={handleChange}
						Inputerror={errors.nombre}
					/>
					<Input
						Inputname="correo"
						Inputlabel="Correo"
						Inputtype="email"
						Inputvalue={formData.correo}
						InputhandleChange={handleChange}
						Inputerror={errors.correo}
					/>

					<Input
						Inputname="contraseña"
						Inputlabel="Contraseña"
						Inputtype="password"
						Inputvalue={formData.contraseña}
						InputhandleChange={handleChange}
						Inputerror={errors.contraseña}
					/>

					<Input
						Inputname="repetirContraseña"
						Inputlabel="Repetir Contraseña"
						Inputtype="password"
						Inputvalue={formData.repetirContraseña}
						InputhandleChange={handleChange}
						Inputerror={errors.repetirContraseña}
					/>

					<Button
						buttonText="Enviar"
						buttonActive={isFormValid()}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};