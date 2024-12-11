import React from 'react';

import styled from 'styled-components';

const CoverForm = () => {
	return (
		<StyledComponent>
			<form action=''>
				<input type='text' name='email' id='email' placeholder='Email'></input>
				<input type='Password' name='password' id='email' placeholder=""></input>
				<button type='submit'></button>
			</form>
			<span></span>
		</StyledComponent>
	);
};

const StyledComponent = styled.div`
	form {
		display: flex;
		gap: 10px;
		margin: 20px 0;
		flex-wrap: wrap;
		input {
			padding: 10px 15px;
			border-radius: 75px;
			border: 1px solid #606060;
			flex-grow: 1;
			font-size: 14px;

			&:focus {
				border: 1px solid #00ff1a;
			}
			&::placeholder {
				color: #606060;
				font-family: Inter;
				font-weight: 400;
			}
		}
		button {
			border-radius: 75px;
			border: 0.88px solid #00ff1a;
			background: rgba(38, 64, 47, 0.25);
			backdrop-filter: blur(3.0999999046325684px);
			color: #3f0;
			font-family: Inter;
			font-size: 16px;
			font-weight: 600;
			padding: 10px 50px;
			flex-grow: 1;
			&:hover {
				background: #3f0;
				color: #fff;
			}
		}
	}
	> span {
		color: #949494;
		text-align: right;
		font-size: 12px;
		font-weight: 400;
		display: block;
		@media (max-width: 700px) {
			text-align: center;
		}
		span {
			color: #949494;
			font-weight: 800;
		}
	}
`;

export default CoverForm;
