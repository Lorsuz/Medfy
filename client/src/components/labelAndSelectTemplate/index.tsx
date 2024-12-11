"use client"
import React, { useState } from "react";

import {
  LabelAndSelect,
  LabelAndSelectContainer,
  LabelAndSvgContainer,
} from "./styles";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { IoIosAlert } from "react-icons/io";

interface Option {
  name: string;
  value?: string;
}

interface LabelAndSelectTemplateProps {
  name: string;
  options: Option[];
  value?: string;
  svgIcon: boolean;
  selectedInput?: (value: string) => void;
}

export default function LabelAndSelectTemplate({
  name,
  options,
  svgIcon,
  // value,
  selectedInput,
}: LabelAndSelectTemplateProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleArrow() {
    setIsOpen((prev) => !prev);
  }

  function closeArrow() {
    setIsOpen(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (selectedInput) {
      selectedInput(event.target.value);
    }
  }

  return (
    <LabelAndSelectContainer>
      {svgIcon ? (
        <LabelAndSvgContainer>
          <label htmlFor={name}>{name}</label>
          <IoIosAlert
            color="#5C5C5C"
            title={`Obrigatório selecionar pelo menos um ${name.toLowerCase()}`}
          />
        </LabelAndSvgContainer>
      ) : (
        <label htmlFor="difficultOfQuestion">{name}</label>
      )}

      <LabelAndSelect>
        <select
          id={name}
          onClick={handleToggleArrow}
          onBlur={closeArrow}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option
              key={option.name}
              value={option.value ? option.value : option.name}
            >
              {option.name}
            </option>
          ))}
        </select>
        {isOpen ? (
          <MdKeyboardArrowUp size={30} color="#5C5C5C" />
        ) : (
          <MdKeyboardArrowDown size={30} color="#5C5C5C" />
        )}
      </LabelAndSelect>
    </LabelAndSelectContainer>
  );
}
