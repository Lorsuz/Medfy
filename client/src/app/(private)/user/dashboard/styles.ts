"use client";

import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  padding: 3.125rem;
  background: #f3f3f3;
  height: 100%;
`;

export const DashboardHeader = styled.header`
  display: flex;
  align-items: center;
  font-weight: 600;

  h1 {
    font-size: 2.5rem;
  }

  span {
    color: var(--theme-color);
    font-size: 2.5rem;
    margin-left: 0.5rem;
  }
`;
export const DashboardContent = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-left: 3.4375rem;
`;

export const ChartContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1.6875rem;
  justify-content: space-between;
  padding: 1.4rem;
`;

export const PercentOfCorrectAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #7db925;
    font-size: 1.6875rem;
    font-weight: 400;
    line-height: 1.75;
  }

  h3 {
    font-size: 1.6875rem;
    font-weight: 500;
  }
`;
export const PercentOfWrongAnswerContainer = styled(
	PercentOfCorrectAnswerContainer
)`
  span {
    color: #de0000;
    font-size: 1.6875rem;
    font-weight: 400;
    line-height: 1.75;
  }
`;

export const DoughnutChartAndFilterContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 65% 35%;
`;
export const PercentProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-left: 0.5rem;
  margin-bottom: 2.5rem;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5625rem;
  width: 22.25rem;

  background-color: #f6f4fc;
  border-radius: 10px;
  overflow: hidden;
`;

export const PercentProgressBarOfCorrectionQuestionsAnswered = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #7db925;
    font-size: 1.6875rem;
  }

  p {
    display: flex;
    gap: 0.3rem;
    font-size: 1.6875rem;
    margin-bottom: 0.3rem;
  }
`;
export const CorrectQuestionsFill = styled.div<{ $percentage: number; }>`
  height: 100%;
  width: ${ ( { $percentage } ) => `${ $percentage }%` };
  background-color: #7db925;
  transition: width 0.3s ease;
`;
export const WrongQuestionsFill = styled( CorrectQuestionsFill )`
  background-color: #de0000;
`;

export const DoughnutChartAndFilterContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 2.5rem;
  background: #fff;
  border-radius: 24px;

  padding: 3rem 2rem 3rem 2rem;
`;
export const MultiAxisLineChartAndFilterContainer = styled(
	DoughnutChartAndFilterContainer
)``;
export const MultiAxisLineChartAndFilterContent = styled(
	DoughnutChartAndFilterContent
)``;

export const DoughnutChartContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4rem;
  border-right: 1px solid #ececec;

  position: relative;
  p {
    position: absolute;
    color: var(--theme-color);
    font-size: 1.5rem;
    font-weight: 600;
    top: 50%;
    left: 47%;
    transform: translate(-303%, 50%);
    width: 5rem;
    text-align: center;
  }
`;

export const MultiAxisLineChartContainer = styled.div`
  display: flex;
  padding-top: 4rem;

  border-right: 1px solid #ececec;
`;

export const InputCheckboxAndLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  border-left: 1px solid #ececec;

  h4 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-top: -1.6rem;
    margin-left: 4.3125rem;
  }
`;

export const InputCheckboxAndLabelContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-left: 4.3125rem;
  input {
    width: 24px;
    height: 24px;
    cursor: pointer;
    appearance: none;
    border: 1px solid #323232;
    border-radius: 4px;
    transition: background-color 0.3s, border-color 0.3s;

    &:checked {
      background-color: var(--theme-color);
      border-color: var(--theme-color);
      position: relative;
    }

    &:checked::before {
      content: "✓";
      color: white;
      font-size: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: bold;
    }
  }

  label {
    color: #323232;
    font-weight: 500;
    font-size: 1.25rem;
  }
`;
