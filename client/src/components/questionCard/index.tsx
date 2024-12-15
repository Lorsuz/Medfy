"use client";

import { useState } from "react";

import {
  AlternativeContainer,
  AnswerButton,
  AnswerButtonContainer,
  AnswerFeedbackReport,
  AnswerFeedbackReportAndExplanationContainer,
  AnswerModeAlternatives,
  // ButtonContainer,
  ClassContainer,
  CorrectQuestionExplanation,
  FinishButtonContainer,
  LocalContainer,
  QuestionCardContainer,
  QuestionContent,
  QuestionIdContainer,
  ResportQuestionAndAnwerButtonContainer,
  SimulatedModeContainer,
  SvgScissorsAndAlternativeContainer,
  TagsContainer,
  TestModeAlternatives,
  TestModeContainer,
  YearAndLocalContainer,
  YearContainer,
} from "./styles";

import { IoMdArrowDropright } from "react-icons/io";

import { FaScissors } from "react-icons/fa6";
import ReportQuestionDialog from "../reportQuestionDialog";
import { Question } from "@/utils/services/fetchQuestions";
import { ResponseOfQuestions } from "@/app/(private)/user/simu/page";

export interface ResponseOfSelectedQuestion {
  isRight: boolean;
  option: string;
  questionId: number;
}

interface QuestionCardProps {
  questionMode: string;
  lastQuestion?: boolean;
  question: Question;
  finishTestMode?: () => void;
  simulatedisAnswerMode?: boolean;
  setAnswer: (data: ResponseOfQuestions) => void;
  selectedAlternative: ResponseOfSelectedQuestion;
}

export default function QuestionCard({
  lastQuestion,
  questionMode,
  question,
  simulatedisAnswerMode,
  finishTestMode,
  setAnswer,
  selectedAlternative,
}: QuestionCardProps) {
  const [isAnswerMode, setIsAnswerMode] = useState(false);

  return (
    <QuestionCardContainer>
      <TagsContainer>
        <QuestionIdContainer>
          <span>ID:</span>
          <p>{question.questionId}</p>
        </QuestionIdContainer>

        {question.categoryHistory.map((classItem, index) => (
          <ClassContainer key={classItem}>
            {classItem}
            {index < question.categoryHistory.length - 1 && (
              <IoMdArrowDropright color="#ADADAD" />
            )}
          </ClassContainer>
        ))}
      </TagsContainer>
      <YearAndLocalContainer>
        <YearContainer>
          <span>Ano: </span>
          <p>{question.year}</p>
        </YearContainer>
        <LocalContainer>
          <span>Local: </span>
          <p>{question.collegeName}</p>
        </LocalContainer>
      </YearAndLocalContainer>
      <QuestionContent>
        <p>{question.question}</p>

        {questionMode === "Teste" ? (
          <TestModeContainer>
            {question.options.map((alternative, index) => (
              <TestModeAlternatives
                key={index}
                $isActive={(
                  alternative.option === selectedAlternative?.option
                ).toString()}
              >
                {isAnswerMode ? (
                  <AnswerModeAlternatives
                    $isActive={(
                      alternative.option === selectedAlternative?.option
                    ).toString()}
                    $isCorrect={alternative.isRight.toString()}
                  >
                    {alternative.option !== selectedAlternative?.option ? (
                      <SvgScissorsAndAlternativeContainer
                        $isActive={(
                          alternative.option === selectedAlternative?.option
                        ).toString()}
                        $isCorrect={alternative.isRight.toString()}
                      >
                        <FaScissors color="#ADADAD" />
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{alternative.option}</p>
                      </SvgScissorsAndAlternativeContainer>
                    ) : (
                      <AlternativeContainer
                        $isActive={(
                          alternative.option === selectedAlternative.option
                        ).toString()}
                        $isCorrect={alternative.isRight.toString()}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{alternative.option}</p>
                      </AlternativeContainer>
                    )}
                  </AnswerModeAlternatives>
                ) : (
                  <button
                    onClick={() =>
                      setAnswer({
                        isRight: alternative.isRight,
                        option: alternative.option,
                        questionId: question.questionId,
                      })
                    }
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {alternative.option}
                  </button>
                )}
              </TestModeAlternatives>
            ))}
            <AnswerButtonContainer>
              <AnswerButton
                onClick={() => setIsAnswerMode(true)}
                disabled={isAnswerMode}
              >
                Responder
              </AnswerButton>
            </AnswerButtonContainer>
            {isAnswerMode && (
              <AnswerFeedbackReportAndExplanationContainer>
                <AnswerFeedbackReport>
                  <p>
                    Resposta correta: Letra {""}
                    {String.fromCharCode(
                      65 +
                        question.options.findIndex(
                          (alternative) => alternative.isRight
                        )
                    )}
                    )
                  </p>
                  <ReportQuestionDialog />
                </AnswerFeedbackReport>
                <CorrectQuestionExplanation>
                  {question.justification}
                </CorrectQuestionExplanation>
              </AnswerFeedbackReportAndExplanationContainer>
            )}
          </TestModeContainer>
        ) : (
          <SimulatedModeContainer>
            {question.options.map((alternative, index) => (
              <TestModeAlternatives
                key={index}
                $isActive={(
                  alternative.option === selectedAlternative?.option
                ).toString()}
              >
                {simulatedisAnswerMode ? (
                  <AnswerModeAlternatives
                    $isActive={(
                      alternative.option === selectedAlternative?.option
                    ).toString()}
                    $isCorrect={alternative.isRight.toString()}
                  >
                    {alternative.option !== selectedAlternative?.option ? (
                      <SvgScissorsAndAlternativeContainer
                        $isActive={(
                          alternative.option === selectedAlternative?.option
                        ).toString()}
                        $isCorrect={alternative.isRight.toString()}
                      >
                        <FaScissors color="#ADADAD" />
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{alternative.option}</p>
                      </SvgScissorsAndAlternativeContainer>
                    ) : (
                      <AlternativeContainer
                        $isActive={(
                          alternative.option === selectedAlternative.option
                        ).toString()}
                        $isCorrect={alternative.isRight.toString()}
                      >
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{alternative.option}</p>
                      </AlternativeContainer>
                    )}
                  </AnswerModeAlternatives>
                ) : (
                  <button
                    onClick={() =>
                      setAnswer({
                        isRight: alternative.isRight,
                        option: alternative.option,
                        questionId: question.questionId,
                      })
                    }
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {alternative.option}
                  </button>
                )}
              </TestModeAlternatives>
            ))}

            {simulatedisAnswerMode && (
              <AnswerFeedbackReportAndExplanationContainer>
                <AnswerFeedbackReport>
                  <p>
                    Resposta correta: Letra{" "}
                    {String.fromCharCode(
                      65 +
                        question.options.findIndex(
                          (alternative) => alternative.isRight
                        )
                    )}
                    )
                  </p>
                  <ReportQuestionDialog />
                </AnswerFeedbackReport>
                <CorrectQuestionExplanation>
                  {question.justification}
                </CorrectQuestionExplanation>
              </AnswerFeedbackReportAndExplanationContainer>
            )}

            {lastQuestion && (
              <FinishButtonContainer>
                <ResportQuestionAndAnwerButtonContainer>
                  <AnswerButton
                    onClick={() => finishTestMode && finishTestMode()}
                    disabled={simulatedisAnswerMode}
                  >
                    Finalizar
                  </AnswerButton>
                </ResportQuestionAndAnwerButtonContainer>
              </FinishButtonContainer>
            )}
          </SimulatedModeContainer>
        )}
      </QuestionContent>
    </QuestionCardContainer>
  );
}
