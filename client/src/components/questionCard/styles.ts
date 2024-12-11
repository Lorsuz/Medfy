"use client";

import styled from "styled-components";

interface IsSelected {
	$isActive: string;
}

interface IsSelectedAndCorrect {
	$isActive: string;
	$isCorrect: string;
}

export const QuestionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.125rem;
  border-radius: 16px;
  background: #ffffff;
  width: 100%;
  height: 100%;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 1rem;
  max-height: 2.0625rem;
  width: 100%;
  background: #f3f3f3;
`;

export const ClassContainer = styled.div`
  display: flex;
  align-items: center;
  color: #5c5c5c;
  gap: 0.2rem;

  p {
    display: flex;
    font-weight: 300;
  }
`;
export const QuestionIdContainer = styled.div`
  display: flex;
  background: #d9d9d9;
  justify-content: center;
  padding: 0.5rem 1rem 0.5rem 1.5rem;
  color: #5c5c5c;
  font: 0.875rem;
  gap: 0.2rem;

  span {
    font-weight: 600;
  }
`;

export const YearAndLocalContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;
export const YearContainer = styled.div`
  display: flex;
  color: #5c5c5c;
  font-size: 0.875rem;
  margin-top: 1rem;
  gap: 0.2rem;

  span {
    font-weight: 600;
  }

  p {
    font-weight: 400;
  }
`;
export const LocalContainer = styled( YearContainer )``;
export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  p {
    color: #5c5c5c;
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

export const AnswerButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2rem;
`;
export const AnswerButton = styled.button`
  background: var(--theme-color);
  color: #ffffff;
  padding: 1rem 4rem;
  border: none;
  margin-top: 2rem;
  border-radius: 40px;
  max-width: 17.9375rem;

  font-weight: 600;
  font-size: 1.5rem;

  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background: #adadad;
    cursor: not-allowed;
  }
`;

export const CorrectQuestionExplanation = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem !important;
`;
export const AnswerFeedbackReportAndExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const AnswerFeedbackReport = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 1rem;

  p {
    gap: 1rem;
    font-weight: 600;
  }
`;

export const TestModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;
export const FinishButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;
export const ResportQuestionAndAnwerButtonContainer = styled.div`
display: flex,
`;

export const SvgScissorsAndAlternativeContainer = styled.div<IsSelectedAndCorrect>`
  display: flex;
  margin-left: -3rem;
  gap: 1rem;
`;

export const AlternativeContainer = styled.div<IsSelectedAndCorrect>`
  display: flex;
  margin-left: -0.5rem;

  gap: 1rem;
`;

export const AnswerModeAlternatives = styled.div<IsSelectedAndCorrect>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;

  p {
    text-decoration: ${ ( { $isActive } ) =>
		$isActive === "true" ? "" : "line-through" };
    color: ${ ( { $isActive } ) => ( $isActive === "true" ? "#5c5c5c" : "#ADADAD" ) };
    font-weight: 400;
    margin: 0;
  }

  span {
    border: 1px solid #5c5c5c;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 1.1875rem;
    border-radius: 50%;
    width: 2rem;
    height: 2rem;

    background: ${ ( { $isActive, $isCorrect } ) =>
		$isActive === "true" && $isCorrect === "true" && "var(--theme-color)" };
    background: ${ ( { $isActive, $isCorrect } ) =>
		$isActive === "true" && $isCorrect === "false" && "#FF0000" };
    color: ${ ( { $isActive, $isCorrect } ) =>
		$isActive === "true" && $isCorrect === "true" ? "#F3F3F3" : "#5c5c5c" };
    color: ${ ( { $isActive, $isCorrect } ) =>
		$isActive === "true" && $isCorrect === "false" && "#F3F3F3" };
    border: ${ ( { $isActive, $isCorrect } ) =>
		$isActive === "true" && $isCorrect === "false" && "none" };
  }
`;

export const AnswerModeAlternativesInTestMode = styled.div<IsSelected>`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  margin-left: -0.5rem;

  p {
    text-decoration: ${ ( { $isActive } ) =>
		$isActive === "true" ? "" : "line-through" };
    color: ${ ( { $isActive } ) => ( $isActive === "true" ? "#5c5c5c" : "#ADADAD" ) };
    font-weight: 400;
    margin: 0;
  }

  span {
    background: ${ ( { $isActive } ) => $isActive === "true" && "var(--theme-color)" };

    color: ${ ( { $isActive } ) => ( $isActive === "true" ? "#F3F3F3" : "#5c5c5c" ) };
  }
`;

export const TestModeAlternatives = styled.div<IsSelected>`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 3rem;

  button {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-left: -0.5rem;

    color: #5c5c5c;
    font-size: 1.5rem;
    background: none;
    border: none;

    &:hover {
      cursor: pointer;
    }

    span {
      background: ${ ( { $isActive } ) =>
		$isActive === "true" ? "var(--theme-color)" : "none" };
      color: ${ ( { $isActive } ) =>
		$isActive === "true" ? "#F3F3F3" : "#5c5c5c" };

      border: 1px solid #5c5c5c;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      font-size: 1.1875rem;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;

      &:hover {
        color: ${ ( { $isActive } ) =>
		$isActive === "true" ? "#F3F3F3" : "var(--theme-color)" };
        border: 1px solid var(--theme-color);
        cursor: pointer;
      }
    }
  }
`;
export const SimulatedModeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
`;
