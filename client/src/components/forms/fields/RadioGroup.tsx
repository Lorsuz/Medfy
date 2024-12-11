"use client"
import React, { useState } from 'react';
import InputRadio from './InputRadio';

const RadioGroup = () => {
	const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

	const handleRadioChange = (id: string) => {
		setSelectedRadio(id);
	};

	return (
		<div>
			<InputRadio id='option1' name='options' checked={selectedRadio === 'option1'} onChange={handleRadioChange}>
				Opção 1
			</InputRadio>
			<InputRadio id='option2' name='options' checked={selectedRadio === 'option2'} onChange={handleRadioChange}>
				Opção 2
			</InputRadio>
			<InputRadio id='option3' name='options' checked={selectedRadio === 'option3'} onChange={handleRadioChange}>
				Opção 3
			</InputRadio>
		</div>
	);
};

export default RadioGroup;
