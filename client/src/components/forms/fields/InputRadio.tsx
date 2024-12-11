import React from 'react';
import styled from 'styled-components';

interface InputRadioProps {
	id: string;
	name: string;
	checked: boolean;
	onChange: (id: string) => void;
	children: React.ReactNode;
}

const InputRadio: React.FC<InputRadioProps> = ({ id, name, checked, onChange, children }) => {
	return (
		<StyledComponent $isChecked={checked}>
			<input type='radio' name={name} id={id} checked={checked} onChange={() => onChange(id)} />
			<label htmlFor={id}>{children}</label>
			{checked && <span>Checked</span>}
		</StyledComponent>
	);
};

const StyledComponent = styled.div<{ $isChecked: boolean }>`
	color: #fff;
	font-family: Inter;
	font-size: 13.669px;
	font-style: normal;
	font-weight: 400;
	line-height: 187%; /* 25.561px */
	display: flex;
	align-items: center;
	gap: 10px;

	input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	label {
		cursor: pointer;
		position: relative;
		padding-left: 25px;
		&::before {
			content: '';
			display: inline-block;
			width: 16px;
			aspect-ratio: 1;
			border-radius: 50%;
			background-color: rgba(107, 107, 107, 0.4);
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
		}
		&::after {
			content: '';
			display: inline-block;
			width: 10px;
			aspect-ratio: 1;
			background-color: ${({ $isChecked }) => ($isChecked ? 'rgba(0, 255, 56, 0.4)' : 'rgba(0, 255, 55, 0)')};
			border-radius: 50%;
			position: absolute;
			left: 3px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
`;

export default InputRadio;
