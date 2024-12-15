"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import fetchApi from "@service/fetchApi";
const FilterForm = () => {
  const [categories, setCategories] = React.useState([]);
  const [years, setYears] = React.useState([]);
  const [colleges, setColleges] = React.useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    let response: [] | any = [];
    response = fetchApi("/category/categories");
    if (response) setCategories(response);
    response = fetchApi("/year/years");
    if (response) setYears(response);
    response = fetchApi("/college/colleges");
    if (response) setColleges(response);
  }, []);

  const renderOptions = (categories: any[], level = 0) => {
    return categories.map((category) => (
      <React.Fragment key={category.id}>
        <option value={category.id}>
          {"-".repeat(level * 2) + " " + category.name}
        </option>
        {category.children?.length > 0 &&
          renderOptions(category.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <StyledComponent>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* categories input in for binary tree*/}
        <label htmlFor="categories">Categorias</label>
        <select {...register("categories")}>
          <option value="">Selecione uma categoria</option>
          {renderOptions(categories)}
        </select>
        {/* years */}
        <label htmlFor="years">Anos</label>
        <select {...register("years")}>
          <option value="">Selecione um ano</option>
          {years.map((year: string) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        {/* college */}

        <label htmlFor="college">Faculdades</label>
        <select {...register("college")}>
          <option value="">Selecione uma faculdade</option>
          {colleges.map((college: string) => (
            <option key={college} value={college}>
              {college}
            </option>
          ))}
        </select>

        <button type="submit">Filtrar</button>
      </form>
    </StyledComponent>
  );
};

export default FilterForm;
const StyledComponent = styled.section`
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	select {
		padding: 0.5rem;
	}
	button {
		padding: 0.5rem;
		background-color: #4caf50;
		color: white;
		border: none;
		cursor: pointer;
	}
`;
