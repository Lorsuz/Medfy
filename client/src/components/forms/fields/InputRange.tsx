"use client"
import React, { useEffect } from 'react';
import styled from 'styled-components';

const InputRange = ({
	label,
	max,
	value,
	onChange = () => {
		return 0;
	}
}: {
	label: string;
	max: number;
	value: number;
	onChange: any;
}) => {
	return (
		<StyledComponent>
			<label htmlFor=''>{label}</label>
			<input type='range' min='0' max={max} onChange={e => onChange(e.target.value)} value={value}></input>
		</StyledComponent>
	);
};
const StyledComponent = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin: 30px 0;
	justify-content: start;

	label {
		color: #edeff2;
		font-family: Inter;
		font-size: 14px;
		font-weight: 400;
		margin-bottom: 10px;
	}
	input {
		appearance: none;
		-webkit-appearance: none;
		width: 100%;
		-webkit-appearance: none;
		appearance: none;

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
			border-radius: 33.956px;
			background: #00ff1a;
			border-radius: 50%;
			width: 16px;
			aspect-ratio: 1;
			transform: translateY(-3px);
			cursor: pointer;
			-webkit-appearance: none;
			appearance: none;
		}
		&::-webkit-slider-runnable-track {
			-webkit-appearance: none;
			background: #212121;
			height: 10px;
			width: 100%;
			border-radius: 50px;
			-webkit-appearance: none;
			appearance: none;
		}
	}
	.progress {
		width: 0;
		height: 2px;
		background: var(--color-text);
		border-radius: 5px;
		position: absolute;
		top: 0;
		left: 0;
	}
`;
export default InputRange;
