"use client";

import styled from "styled-components";

interface IsEditing {
	$isEditing: string;
}

export const ProfileContainer = styled.div`
  display: flex;
  padding: 3.125rem 3.125rem 0 3.125rem;
  background: #f3f3f3;
`;

export const TwoInputsContainer = styled.div`
  display: flex;
  gap: 2.5rem;
`;
export const TitleAndContent = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  flex-direction: column;
  margin-left: 2.5rem;

  h2 {
    font-weight: 500;
  }

  h1 {
    margin: 0.4rem 0 2.5rem 0;
  }
`;

export const ProfileContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-direction: column;

  max-height: 48.4rem;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  h1 {
    color: #242424;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const AdminProfileContent = styled( ProfileContent )``;

export const Avatar = styled.img`
  width: 5.8125rem;
  height: 5.8125rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

export const AvatarImageContainer = styled.div<IsEditing>`
  display: flex;

  img {
    &:hover {
      cursor: ${ ( { $isEditing } ) => ( $isEditing === "true" ? "pointer" : "" ) };
    }
  }
`;

export const AvatarWithoutImageContainer = styled.div<IsEditing>`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  img {
    &:hover {
      cursor: ${ ( { $isEditing } ) => ( $isEditing === "true" ? "pointer" : "" ) };
    }
  }
`;

export const ProfileDataAndAcademicInfo = styled.section`
  display: flex;
  flex-direction: column;

  img {
    margin-top: 1rem;
  }
`;

export const LabelAndInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #666666;

  input {
    color: #666666;
    padding: 1rem 0 1rem 0.87rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid #e6e6e6;
    font-size: 0.875rem;

    &::placeholder {
      color: #d8d8d8;
      font-weight: 400;
    }
  }

  label {
    color: #666666;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;
export const LabelAndSelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #666666;

  select {
    color: #d8d8d8;
    padding: 1.125rem 0 1.125rem 0.87rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    border: 1px solid #e6e6e6;
    font-size: 0.875rem;

    option {
      color: #b5b5b5;
    }
  }

  label {
    color: #666666;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const LoginInfo = styled.section`
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1.5rem;
  }

  label {
    margin-bottom: 0.5rem;
  }
`;

export const ProfileDataContent = styled.section`
  padding: 2.5rem 2.5rem 4.75rem 2.5rem;
  background: #ffffff;

  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  margin-bottom: 2rem;
`;
export const PasswordDataContent = styled( ProfileDataContent )``;

export const NewPasswordContainer = styled.div`
  display: flex;

  gap: 1.5rem;
`;

export const AcademicInfoContent = styled( ProfileDataContent )``;

export const EditProfileButton = styled.button`
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  padding: 1rem 0 1rem 0;
  border-radius: 40px;
  border: none;
  color: #9b9b9b;
  background: #efefef;

  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

export const DeleteAccountButtonAndTrashIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  gap: 0.3rem;
`;

export const CurrentPasswordAndForgotPasswordContainer = styled.div`
  text-align: end;

  label {
    text-align: start;
  }

  input {
    margin-bottom: 0.3rem;
  }
`;

export const TitleAndEditButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: var(--theme-color);
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;

export const ForgotPassword = styled.a`
  color: #666666;

  &:hover {
    cursor: pointer;
    color: var(--theme-color);
    border-bottom: 1px solid var(--theme-color);
  }
`;

export const SaveButton = styled( EditButton )`
  background: var(--theme-color)0d;
  padding: 0.5rem;
  border-radius: 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const HowDidYouMeetMedfyContent = styled( ProfileDataContent )`
  padding-bottom: 2rem;

  h2 {
    color: var(--theme-color);
    font-weight: 500;
    margin-bottom: 1.6875rem;
  }

  input {
    color: #666666;
    width: 30.375rem;
    padding: 1rem 0 1rem 0.87rem;
    box-sizing: border-box;
    border-radius: 12px;
    border: 1px solid #e6e6e6;
    font-size: 0.875rem;

    &::placeholder {
      color: #d8d8d8;
      font-weight: 400;
    }
  }
`;

export const TotalAccessAndTotalSignaturesContainer = styled.section`
  display: flex;
  gap: 1.5rem;
`;

export const TotalAccessContainer = styled.div`
  background: #ffffff;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;

  h2 {
    margin-bottom: 2.5rem;
    font-size: 1.75rem;
    font-weight: 500;
    color: #242424;
  }

  p {
    font-size: 5.375rem;
  }

  span {
    color: #323232;
    font-weight: 300;
  }
`;

export const TotalSignaturesContainer = styled( TotalAccessContainer )``;

export const ManageQuestionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: #ffffff;
  border-radius: 16px;
  padding: 2.5rem;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0 0 1rem 0;
  }
`;

export const InputAndSearchButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  max-width: 35.6875rem;
  width: 100%;

  input {
    width: 100%;
    border-radius: 32px;
    padding: 1rem;
    padding-right: 3rem;
    border: 1px solid #adadad;
  }

  svg {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

export const ManageUserContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: #ffffff;
  margin-top: 0.5rem;
  border-radius: 16px;
  padding: 2.5rem;

  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0 0 1rem 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    color: #2f2f2f;
  }
`;

export const PlanManageContainer = styled( ManageUserContainer )``;

export const ListOfUserContainer = styled.div`
  color: #242424;
  padding-bottom: 1rem;
  margin-top: -1rem;
  border-bottom: 2px solid rgba(83, 33, 204, 0.05);

  p {
    font-size: 1.5rem;
  }
  span {
    color: #323232;
  }
`;

export const AddQuestionButtonManually = styled.button`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: none;
  border: none;
  color: var(--theme-color);

  p {
    font-size: 1.75rem;

    font-weight: 500;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const AddQuestionButtonWithPDFContainer = styled.div`
  align-items: flex-start;
  flex-direction: column;

  display: flex;
  gap: 1.5rem;
  background: none;
  border: none;
  color: var(--theme-color);

  p {
    font-size: 1.75rem;

    font-weight: 500;
  }

  &:hover {
    cursor: pointer;
  }
`;
export const AddQuestionButton = styled.button`
  background: var(--theme-color);
  color: #f9f9f9;
  padding: 1rem;
  border-radius: 28px;
  border: none;
  width: 17.8125rem;
  margin-left: 3.4rem;

  &:hover {
    cursor: pointer;
  }
`;

export const AddQuestionButtonAndSvgContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: -0.5rem;
`;
export const PDFNameAndSvgContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #5c5c5c;
  font-weight: 500;
  font-size: 1.25rem;
  margin: 0;

  span {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const AddQuestionManuallyContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
export const ListOfQuestionsLink = styled.a`
  color: var(--theme-color);
  font-size: 1.75rem;
  font-weight: 500;

  svg {
    margin-right: 1.5rem;
    margin-left: 0.2rem;
  }
`;
export const AddQuestionManuallyForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const YearDifficultAndLocaleOfQuestion = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 6rem;
`;

export const LabelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  input {
    border: 1px solid #dcdcdc;
    padding: 1.1875rem 0 1.1875rem 1.1875rem;
    width: 100%;
    max-width: 33.375rem;

    border-radius: 8px;
  }

  label {
    color: #5c5c5c;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
`;



export const LabelAndTextArea = styled( LabelAndInput )`
  width: 100%;

  textArea {
    max-width: 33.375rem;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    height: 9.6875rem;
    resize: none;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export const SaveQuestionButton = styled.button`
  background: var(--theme-color);
  margin-top: 2rem;
  border-radius: 28px;
  color: #f9f9f9;
  padding: 1rem;
  max-width: 33.375rem;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const PlanContainer = styled.section`
  background: var(--theme-color)0d;
  border-radius: 16px;
  padding: 2.5rem;
  padding-top: 1rem;
  position: relative;

  span {
    position: absolute;
    margin-top: -1.6rem;
    background: var(--theme-color);
    padding: 0.2rem 0.5rem;
    color: #ffffff;
    border-radius: 8px;
  }
`;
export const PlanLabelAndInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  label {
    color: #5c5c5c;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    max-width: 35.6875rem;
  }
`;
export const PlanLabelAndSelect = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;

  label {
    color: #5c5c5c;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  select {
    padding: 1rem;
    border: none;
    border-radius: 8px;
    max-width: 35.6875rem;
  }
`;

export const AddPlanButtonManually = styled( AddQuestionButtonManually )``;

export const EditButtonAndLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SavePlanButton = styled( SaveButton )`
  background: #ffffff;
`;
