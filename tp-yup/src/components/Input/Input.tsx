import { FC } from 'react';
import styles from './Input.module.css';
import { InputProps } from '../../types/types';

export const Input: FC<InputProps> = ({
	Inputlabel,
	Inputname,
	Inputtype,
	Inputvalue,
	InputhandleChange,
	Inputerror,
}) => {
	return (
		<div className={styles.inputContainer}>
			<label htmlFor={Inputname}>{Inputlabel}</label>
			<input
				type={Inputtype}
				name={Inputname}
				value={Inputvalue}
				onChange={InputhandleChange}
			/>
			{Inputerror && <p className={styles.errorMessage}>{Inputerror}</p>}
		</div>
	);
};
