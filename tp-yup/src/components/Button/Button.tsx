import { FC } from 'react';
import styles from './Button.module.css';
import { ButtonProps } from '../../types/types';


export const Button: FC<ButtonProps> = ({
	handleSubmit,
	buttonText,
	buttonActive,
}) => {
	return (
		<button
			className={styles.button}
			onClick={handleSubmit}
			disabled={!buttonActive}>
			{buttonText}
		</button>
	);
};
