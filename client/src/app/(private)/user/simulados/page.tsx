"use client";

import { useState, useEffect, useCallback } from "react";

import SideBar from "@/components/partials/SideBar";

import {
  FilterButton,
  FiltersContainer,
  HideAndShowSideBarButton,
  HideTitleAndContent,
  ListOfQuestionsContainer,
  LocalDifficultAndFilterButtonContainer,
  QuestionsContainer,
  SelectPageButton,
  SelectPageButtonContainer,
  SimulatedModeContainer,
  TextAndSvgContainer,
  ThemeQuestionModeAndYearSelectContainer,
  TitleAndContent,
} from "./styles";

import { IoIosAlert } from "react-icons/io";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import LabelAndSelectTemplate from "@/components/labelAndSelectTemplate";
import QuestionCard from "@/components/questionCard";
import {
  Question /* QuestionRequest, fetchQuestions */,
} from "@/utils/services/fetchQuestions";

// import { z } from "zod";
import { Category, fetchCategories } from "@/utils/services/fetchCategories";
import { College, fetchCollege } from "@/utils/services/fetchCollege";
// import { useForm } from "react-hook-form";

// /* export */ const QuestionFilterSchema = z.object({
//   theme: z.string().min(1, "O tema é obrigatório"),
//   year: z.string(),
//   subTheme: z.string().optional(),
//   location: z.string().optional(),
// });

// export type QuestionFilterSchemaType = z.infer<typeof QuestionFilterSchema>;

export interface ResponseOfQuestions {
  questionId: number;
  isRight: boolean;
  option: string;
}

export default function Questions() {
  const [hideBar, setHideBar] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionList /* , setQuestionList */] = useState<Question[]>();
  const [categoryList, setCategoryList] = useState<Category[]>();
  const [collegeList, setCollegeList] = useState<College[]>();
  const [simulatedIsAnswerMode, setSimulatedIsAnswerMode] =
    useState<boolean>(false);
  const [listOfAnswer, setListOfAnswer] = useState<ResponseOfQuestions[]>([]);

  const [subCategoryList, setSubCategoryList] = useState<Category[]>();
  const limit = 15;

  const questions: Question[] = [
    {
      questionId: 1,
      question:
        "Qual é o principal neurotransmissor envolvido na transmissão neuromuscular?",
      justification:
        "A acetilcolina é o neurotransmissor responsável por transmitir o impulso nervoso na junção neuromuscular.",
      year: 2024,
      collegeName: "Faculdade de Medicina",
      options: [
        { option: "Acetilcolina", isRight: true },
        { option: "Dopamina", isRight: false },
        { option: "Serotonina", isRight: false },
        { option: "Noradrenalina", isRight: false },
      ],
      isRights: "Acetilcolina",
      categoryId: 201,
      categoryHistory: ["Neurociência", "Fisiologia Médica"],
    },
    {
      questionId: 2,
      question: "Qual é o principal agente etiológico da tuberculose?",
      justification:
        "O Mycobacterium tuberculosis é a bactéria causadora da tuberculose, uma doença infecciosa que afeta principalmente os pulmões.",
      year: 2023,
      collegeName: "Universidade de Ciências Médicas",
      options: [
        { option: "Mycobacterium tuberculosis", isRight: true },
        { option: "Staphylococcus aureus", isRight: false },
        { option: "Escherichia coli", isRight: false },
        { option: "Klebsiella pneumoniae", isRight: false },
      ],
      isRights: "Mycobacterium tuberculosis",
      categoryId: 202,
      categoryHistory: ["Infectologia", "Microbiologia"],
    },
  ];

  async function handleFinishTestMode() {
    setSimulatedIsAnswerMode(true);
  }

  async function handleSetQuestionAnswer(data: ResponseOfQuestions) {
    setListOfAnswer((prevAnswers) => {
      const answerExists = prevAnswers.find(
        (answer) => answer.questionId === data.questionId
      );

      if (answerExists) {
        return prevAnswers.map((answer) =>
          answer.questionId === data.questionId ? data : answer
        );
      } else {
        return [...prevAnswers, data];
      }
    });
  }

  console.log(listOfAnswer);

  /*  async function handleGetQuestions(data: QuestionFilterSchemaType) {
    try {
      if (data.subTheme === undefined && data.location !== undefined) {
        const questionsResponse = await fetchQuestions({
          category: data.theme,
          college: data.location,
          year: data.year,
        });

        if (Array.isArray(questionsResponse)) {
          setQuestionList(questionsResponse);
        }
      }
      if (data.subTheme !== undefined && data.location !== undefined) {
        const questionsResponse = await fetchQuestions({
          category: data.subTheme,
          college: data.location,
          year: data.year,
        });

        if (Array.isArray(questionsResponse)) {
          setQuestionList(questionsResponse);
        }
      }
    } catch (error) {
      console.error(`Erro ao consultar as questões:${error}`);
    }
  } */

  async function getCategory() {
    try {
      const categoriesResponse = await fetchCategories();

      if (Array.isArray(categoriesResponse)) {
        setCategoryList(categoriesResponse);
      }
    } catch (error) {
      console.error(`Erro ao consultar as categorias:${error}`);
    }
  }
  async function getCollege() {
    try {
      const CollegesResponse = await fetchCollege();

      if (Array.isArray(CollegesResponse)) {
        setCollegeList(CollegesResponse);
      }
    } catch (error) {
      console.error(`Erro ao consultar os locais:${error}`);
    }
  }

  // const [currentStep, setCurrentStep] = useState(0);

  const [questionMode, setQuestionMode] = useState<string>("Teste");

  // const startIndex = (currentPage - 1) * limit;
  // const endIndex = startIndex + limit;

  // const paginatedItems =
  //   questionList && questionList.slice(startIndex, endIndex);
  const totalPages = questionList && Math.ceil(questionList.length / limit);
  // const methods = useForm();
  const pages = Array.from(
    { length: totalPages as number },
    (_, index) => index + 1
  );

  // const handleStepChange = (step?: number) => {
  //   if (step !== undefined) {
  //     setCurrentStep(step);
  //   } else if (questionList && currentStep < questionList.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   }
  // };

  // const currentQuestion = questionList && questionList[currentStep];

  useEffect(() => {
    getCategory();
    getCollege();
  }, []);

  const handleSelectTheme = useCallback(
    (name: string) => {
      const filteredCategories = categoryList
        ?.filter((category) => category.name === name)
        .flatMap((category) => category.children);

      setSubCategoryList(filteredCategories);
    },
    [categoryList]
  );

  useEffect(() => {
    if (categoryList && categoryList?.length > 0)
      handleSelectTheme(categoryList[0].name);
  }, [categoryList, handleSelectTheme]);

  return (
    <QuestionsContainer>
      <TitleAndContent>
        <h1>Questões</h1>

        {hideBar ? (
          <HideTitleAndContent>
            <HideAndShowSideBarButton
              onClick={() => setHideBar((prev) => !prev)}
            >
              <IoIosArrowDown color="var(--theme-color)" size={18} />
            </HideAndShowSideBarButton>
          </HideTitleAndContent>
        ) : (
          <FiltersContainer>
            {!hideBar && (
              <HideAndShowSideBarButton
                onClick={() => setHideBar((prev) => !prev)}
              >
                <IoIosArrowUp color="var(--theme-color)" size={18} />
              </HideAndShowSideBarButton>
            )}
            <ThemeQuestionModeAndYearSelectContainer>
              <LabelAndSelectTemplate
                name="Tema"
                options={
                  categoryList ? categoryList.map((category) => category) : []
                }
                svgIcon={true}
                selectedInput={(prev) => handleSelectTheme(prev)}
              />
              <LabelAndSelectTemplate
                name="Modo de questões"
                options={[{ name: "Teste" }, { name: "Simulado" }]}
                svgIcon={true}
                selectedInput={(prev) => setQuestionMode(prev)}
              />
              <LabelAndSelectTemplate
                name="Ano"
                options={[{ name: "2020" }]}
                svgIcon={false}
              />
            </ThemeQuestionModeAndYearSelectContainer>
            <LocalDifficultAndFilterButtonContainer>
              <LabelAndSelectTemplate
                name="Subtema (opcional)"
                options={[
                  { name: "Escolha um subtema", value: undefined },
                  ...(subCategoryList
                    ? subCategoryList.map(
                        (filteredCategory) => filteredCategory
                      )
                    : []),
                ]}
                svgIcon={false}
              />
              <LabelAndSelectTemplate
                name="Local"
                options={[
                  { name: "Escolha um subtema", value: undefined },
                  ...(collegeList
                    ? collegeList.map((filteredCollege) => filteredCollege)
                    : []),
                ]}
                svgIcon={false}
              />
              <FilterButton>Filtrar</FilterButton>
            </LocalDifficultAndFilterButtonContainer>
          </FiltersContainer>
        )}

        <ListOfQuestionsContainer>
          {questionList && questionList.length === 0 ? (
            <TextAndSvgContainer>
              <IoIosAlert color="#5C5C5C" size={33} />
              <h2>
                Selecione pelo menos um tema e o modo para iniciar seus estudos.
              </h2>
            </TextAndSvgContainer>
          ) : (
            <SimulatedModeContainer>
              {questionMode === "Simulado" ? (
                <>
                  {questions &&
                    questions.map((item, index) => (
                      <QuestionCard
                        questionMode={questionMode}
                        key={`${item} + ${Math.random()}`}
                        lastQuestion={
                          index === questions.length - 1 ? true : false
                        }
                        question={item}
                        finishTestMode={() => handleFinishTestMode()}
                        simulatedisAnswerMode={simulatedIsAnswerMode}
                        setAnswer={(answer: ResponseOfQuestions) =>
                          handleSetQuestionAnswer(answer)
                        }
                        selectedAlternative={
                          listOfAnswer?.find(
                            (answer) => answer.questionId === item.questionId
                          ) || {
                            isRight: false,
                            option: "",
                            questionId: item.questionId,
                          }
                        }
                      />
                    ))}
                </>
              ) : (
                <>
                  {questions &&
                    questions.map((item) => (
                      <QuestionCard
                        questionMode={questionMode}
                        key={`${item} + ${Math.random()}`}
                        question={item}
                        setAnswer={(answer: ResponseOfQuestions) =>
                          handleSetQuestionAnswer(answer)
                        }
                        selectedAlternative={
                          listOfAnswer?.find(
                            (answer) => answer.questionId === item.questionId
                          ) || {
                            isRight: false,
                            option: "",
                            questionId: item.questionId,
                          }
                        }
                      />
                    ))}
                </>
              )}
            </SimulatedModeContainer>
          )}
        </ListOfQuestionsContainer>
        {pages.length >= 15 && (
          <SelectPageButtonContainer>
            {pages.map((page) => (
              <SelectPageButton
                $isActive={(currentPage === page).toString()}
                onClick={() => setCurrentPage(page)}
                key={page}
              >
                {page}
              </SelectPageButton>
            ))}
          </SelectPageButtonContainer>
        )}
      </TitleAndContent>
    </QuestionsContainer>
  );
}
