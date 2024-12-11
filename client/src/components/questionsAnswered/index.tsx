import {
  CorrectQuestionsFill,
  ProgressBar,
  ProgressBarAndNumberOfCorrectionQuestionsAnswered,
  ProgressBarAndNumberOfWrongQuestionsAnswered,
  ProgressBarOfAllAnswerContainer,
  QuestionsAnsweredAndProgressBar,
  QuestionsAnsweredContainer,
  QuestionsAnsweredNumberAndArcContainer,
  WrongQuestionsFill,
} from "./style";

import Image from "next/image";

import arc_image from "@image/arc_image.svg";

interface QuestionsAnsweredProp {
  questions: number;
  correctQuestions: number;
  wrongQuestions: number;
}

export default function QuestionsAnswered({
  correctQuestions,
  questions,
  wrongQuestions,
}: QuestionsAnsweredProp) {
  const percentOfCorrectQuestion = (correctQuestions / questions) * 100;
  const percentOfWrongQuestion = (wrongQuestions / questions) * 100;

  return (
    <QuestionsAnsweredContainer>
      <h2>Questões respondidas</h2>
      <QuestionsAnsweredAndProgressBar>
        <QuestionsAnsweredNumberAndArcContainer>
          <Image src={arc_image} alt="arc image" />
          <p>{questions}</p>
        </QuestionsAnsweredNumberAndArcContainer>
        <ProgressBarOfAllAnswerContainer>
          <ProgressBarAndNumberOfCorrectionQuestionsAnswered>
            <p>
              <span>{correctQuestions}</span>
              {correctQuestions >= 1 ? ` Corretas` : ` Correta`}
            </p>
            <ProgressBar>
              <CorrectQuestionsFill $percentage={percentOfCorrectQuestion} />
            </ProgressBar>
          </ProgressBarAndNumberOfCorrectionQuestionsAnswered>
          <ProgressBarAndNumberOfWrongQuestionsAnswered>
            <p>
              <span>{wrongQuestions}</span>
              {wrongQuestions >= 1 ? ` Erradas` : ` Errada`}
            </p>
            <ProgressBar>
              <WrongQuestionsFill $percentage={percentOfWrongQuestion} />
            </ProgressBar>
          </ProgressBarAndNumberOfWrongQuestionsAnswered>
        </ProgressBarOfAllAnswerContainer>
      </QuestionsAnsweredAndProgressBar>
    </QuestionsAnsweredContainer>
  );
}
