"use client";

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const InputText = ({
  type = "text",
  id,
  name,
  label,
  placeholder,
  children,
  size = "1/3",
  handleInput = (e: any) => e,
  error,
	...rest
}: {
  type?: "text" | "password";
  id?: string;
  label?: string;
  children?: React.ReactNode;
  size?: string;
  name?: string;
  placeholder?: string;
  handleInput?: (value: string, isVisible: boolean) => void;
  error?: string;
}) => {
  const [momentarilyType, setMomentarilyType] = useState(type);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [inputContent, setInputContent] = useState("");

  const handleToggleVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setMomentarilyType((prevType) => (prevType === type ? "text" : type));
    setPasswordIsVisible((prevState) => !prevState);
  };

  const handleInputChange = (value: string) => {
    setInputContent(value);
    handleInput(value, passwordIsVisible);
  };

  useEffect(() => {
    handleInput(inputContent, passwordIsVisible);
  }, [inputContent, passwordIsVisible]);

  return (
    <StyledComponent $size={size}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="field">
        {children ? (
          <>{children}</>
        ) : (
          <>
            <input
              type={momentarilyType}
              name={name}
              id={id}
              placeholder={placeholder}
							onChange={(e) => {
								handleInputChange(e.target.value);
								// rest.onChange(e); // Isso conecta ao `react-hook-form`
							}}
							{...rest}
            />
            {type === "password" && (
              <button onClick={handleToggleVisibility}>
                {passwordIsVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            )}
          </>
        )}
      </div>
      {error && <span>{error}</span>}
    </StyledComponent>
  );
};

const StyledComponent = styled.div<{ $size: string }>`
  grid-column: ${({ $size }) => $size};
	@media (max-width: 500px) {
		grid-column: 1/3;
		
	}

  label {
    margin-bottom: 0.4rem;
    display: block;
    width: 100%;
    padding-left: 0.5rem;
    color: #5c5c5c;
    font-weight: 600;
  }
  .field {
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    background-color: #f9f9f9;
    border-radius: 10px;
    border: 2px solid rgba(195, 195, 195, 0.5);
    gap: 10px;
    width: 100%;
    padding: 10px 20px;

    input {
      font-size: 1rem;
      padding: 10px 0px;
      font-weight: 400;
      width: 100%;
      flex-grow: 1;
      display: flex;
      align-items: center;
    }

    &:has(input:focus) {
      border: 2px solid var(--theme-color);
    }
    button {
      display: flex;
      align-content: center;
      justify-content: center;
      svg {
        font-size: 1.2rem;
				color: var(--theme-color);
      }
    }
  }
  span {
    color: red;
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }
`;

export default InputText;
