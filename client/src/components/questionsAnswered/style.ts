"use client";

import styled from "styled-components";

export const QuestionsAnsweredContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  padding: 2rem 3rem 3rem 2.5rem;
`;

export const QuestionsAnsweredAndProgressBar = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 7.75rem;
  margin-top: 3.5rem;
`;

export const QuestionsAnsweredNumberAndArcContainer = styled.div`
  display: flex;

  position: relative;

  p {
    position: absolute;
    font-size: 4rem;
    font-weight: 500;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
`;

export const ProgressBarOfAllAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3125;
`;

export const ProgressBarAndNumberOfCorrectionQuestionsAnswered = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #7db925;
    font-size: 1.6875rem;
    font-weight: 400;
  }

  p {
    display: flex;
    width: 10rem;
    gap: 0.3rem;
    font-size: 1.6875rem;
    margin-bottom: 0.3rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.5625rem;
  width: 22.25rem;

  background-color: #f6f4fc;
  border-radius: 10px;
  overflow: hidden;
`;

export const CorrectQuestionsFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => `${$percentage}%`};
  background-color: #7db925;
  transition: width 0.3s ease;
`;
export const WrongQuestionsFill = styled(CorrectQuestionsFill)`
  background-color: #de0000;
`;

export const ProgressBarAndNumberOfWrongQuestionsAnswered = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  p {
    display: flex;
    gap: 0.4rem;
    font-size: 1.6875rem;
    line-height: 1.75;
  }
  span {
    color: #de0000;
    font-size: 1.6875rem;
    font-weight: 400;
  }
`;