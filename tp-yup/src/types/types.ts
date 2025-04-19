export type ButtonProps = {
	handleSubmit: (e: React.FormEvent) => void;
	buttonText: string;
	buttonActive: boolean;
};

export type InputProps = {
	Inputlabel: string;
	Inputname: string;
	Inputtype: string;
	Inputvalue: string;
	InputhandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	Inputerror: string | null;
};
