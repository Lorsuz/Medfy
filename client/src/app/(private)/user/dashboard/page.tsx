"use client";
import SideBar from "@partial/SideBar";
import {
  CorrectQuestionsFill,
  DashboardContainer,
  DashboardContent,
  DashboardHeader,
  DoughnutChartAndFilterContainer,
  DoughnutChartAndFilterContent,
  DoughnutChartContainer,
  InputCheckboxAndLabelContainer,
  InputCheckboxAndLabelContent,
  MultiAxisLineChartAndFilterContainer,
  MultiAxisLineChartAndFilterContent,
  PercentOfCorrectAnswerContainer,
  PercentOfWrongAnswerContainer,
  PercentProgressBarContainer,
  ProgressBar,
  WrongQuestionsFill,
} from "./styles";
import styled from 'styled-components'
import DoughnutChart from "@/components/DoughnutChart";
import QuestionsAnswered from "@/components/questionsAnswered";
import MultiAxisLineChart from "@/components/multiAxisLineChart";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

export default function Dashboard() {
	const user = useSelector((state: RootState) => state.auth.user);
  return (
    <StyledComponent>
      <h1>Olá {user.name}! Esse é seu <span>dashboard</span></h1>
      <QuestionsAnswered
            correctQuestions={40}
            questions={100}
            wrongQuestions={60}
          />
          <DoughnutChartAndFilterContainer>
            <h2>Porcentagem de questões respondidas</h2>

            <DoughnutChartAndFilterContent>
              <DoughnutChartContainer>
                <DoughnutChart />
                <p>128</p>
                <PercentProgressBarContainer>
                  <PercentOfCorrectAnswerContainer>
                    <h3>
                      <span>70%</span> De acertos
                    </h3>
                    <ProgressBar>
                      <CorrectQuestionsFill $percentage={40} />
                    </ProgressBar>
                  </PercentOfCorrectAnswerContainer>
                  <PercentOfWrongAnswerContainer>
                    <h3>
                      <span>70%</span> De erros
                    </h3>
                    <ProgressBar>
                      <WrongQuestionsFill $percentage={60} />
                    </ProgressBar>
                  </PercentOfWrongAnswerContainer>
                </PercentProgressBarContainer>
              </DoughnutChartContainer>
              <InputCheckboxAndLabelContainer>
                <h4>Filtrar por</h4>

                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Tudo</label>
                </InputCheckboxAndLabelContent>
                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Cardiologia</label>
                </InputCheckboxAndLabelContent>
                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Pediatria</label>
                </InputCheckboxAndLabelContent>
                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Traumatologia</label>
                </InputCheckboxAndLabelContent>
                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll"> Gastroenterologista</label>
                </InputCheckboxAndLabelContent>
              </InputCheckboxAndLabelContainer>
            </DoughnutChartAndFilterContent>
          </DoughnutChartAndFilterContainer>
          <MultiAxisLineChartAndFilterContainer>
            <h2>Análise de desempenho</h2>
            <MultiAxisLineChartAndFilterContent>
              <MultiAxisLineChart />
              <InputCheckboxAndLabelContainer>
                <h4>Filtrar por</h4>

                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Semanal</label>
                </InputCheckboxAndLabelContent>
                <InputCheckboxAndLabelContent>
                  <input type="checkbox" id="checkAll" />
                  <label htmlFor="checkAll">Mensal</label>
                </InputCheckboxAndLabelContent>
              </InputCheckboxAndLabelContainer>
            </MultiAxisLineChartAndFilterContent>
          </MultiAxisLineChartAndFilterContainer>
    </StyledComponent>
  );
}

const StyledComponent = styled.main`
	h1{
		span{
			color: var(--theme-color);	
		}
	}
`;
