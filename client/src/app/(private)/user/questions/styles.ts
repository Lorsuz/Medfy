"use client";

import styled from "styled-components";

interface IsSelected {
	$isActive: string;
}

/* interface IsSelectedAndCurrent {
	$isActive: string;
	$isCurrent: string;
} */

export const QuestionsContainer = styled.div`
  display: flex;
  padding: 3.125rem 3.125rem 2rem 3.125rem;
  background: #f3f3f3;
  width: 100%;
  height: 100%;
`;

export const TitleAndContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  flex-direction: column;
  margin-left: 2.5rem;

  h2 {
    font-weight: 500;
  }

  h1 {
    margin: 0.4rem 0 2.5rem 0;
  }
`;
export const HideTitleAndContent = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  background: var(--theme-color)0d;
  border-radius: 19px;
  padding: 1.5rem 0;
`;

export const FiltersContainer = styled.section`
  background: var(--theme-color)0d;
  padding: 2.5rem;
  border-radius: 16px;
  position: relative;
`;

export const HideAndShowSideBarButton = styled.button`
  background: #f3f3f3;
  border-radius: 99px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border: none;
  position: absolute;
  right: 50%;
  bottom: -1.4rem;
  transform: translateX(-50%);
`;

export const TitleAndAlertSvgContainer = styled.section`
  display: flex;
  align-items: center;
  gap: 0.1rem;
`;

export const LabelAndSelectContainer = styled.section`
  display: flex;
  flex-direction: column;

  select {
    margin-top: 0.5rem;
    max-width: 16.1875rem;
    padding: 1rem;
    border-radius: 8px;
    border: none;
  }
`;

export const ThemeQuestionModeAndYearSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LocalDifficultAndFilterButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

export const FilterButton = styled.button`
  background: var(--theme-color);
  margin-top: 2.1rem;
  margin-left: 1.5rem;
  border: none;
  border-radius: 32px;
  width: 14.5625rem;
  padding: 0.8125rem;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.25rem;
`;

export const ListOfQuestionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  justify-content: center;
  margin-top: 3rem;
  border-radius: 16px;

  h2 {
    display: flex;
    align-items: center;
    color: #242424;
    font-weight: 500;
    font-size: 1.75rem;
    margin-top: 1rem;
  }
`;

export const TextAndSvgContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5.25rem;
`;

export const SelectPageButton = styled.button<IsSelected>`
  padding: 1rem;
  border: 1px solid var(--theme-color);
  border-radius: 6px;

  color: ${ ( { $isActive } ) => ( $isActive === "true" ? "#FFFFFF" : "var(--theme-color)" ) };
  background: ${ ( { $isActive } ) => ( $isActive === "true" ? "var(--theme-color)" : "none" ) };

  &:hover {
    cursor: pointer;
  }
`;
export const SimulatedModeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectPageButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

