import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const Overlay = styled( Dialog.Overlay )`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Title = styled( Dialog.Title )`
  color: #242424;
  font-weight: 500;
  font-size: 1.25rem;
`;

export const Description = styled( Dialog.Description )`
  display: flex;
  text-align: start;
  margin-top: 1rem;
  color: #5c5c5c;
  font-weight: 500;
`;
export const Content = styled( Dialog.Content )`
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;

  textArea {
    margin-top: 0.5rem;
    width: 100%;
    height: 9.6875rem;
    resize: none;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 1rem;
  }

  flex-direction: column;
  width: 38.375rem;
  text-align: center;
  border-radius: 6px;
  padding: 2.5rem;
  background: #ffffff;
  color: #fffefe;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TriggerDialogContainer = styled.div`
  display: flex;
  gap: 0.3rem;
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const ReportButton = styled.button`
  padding: 0.7rem;
  border: none;
  margin-top: 2rem;
  width: 100%;
  padding: 0.8125rem 2.75rem;
  border-radius: 40px;
  background: var(--theme-color);

  color: white;

  font-weight: 700;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export const TitleAndCloseButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const CloseAndDeleteAccountButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const ReportQuestionButton = styled.button`
  display: flex;
  gap: 0.5rem;
  color: #de0000;
  align-items: center;
  background: none;
  padding-bottom: 0.1rem;
  border: none;
  border-bottom: 2px solid #de0000;
  font-size: 1.1875rem;

  &:hover {
    cursor: pointer;
  }
`;
