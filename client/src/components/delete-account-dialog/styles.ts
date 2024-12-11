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
  color: #505050;
  font-weight: 500;
  font-size: 1rem;
`;

export const Description = styled( Dialog.Description )`
  display: flex;
  text-align: start;
  margin-top: 1rem;
  color: #a4a4a4;
`;
export const Content = styled( Dialog.Content )`
  display: flex;
  align-items: flex-start;
  font-size: 0.875rem;

  flex-direction: column;
  width: 31rem;
  text-align: center;
  border-radius: 6px;
  padding: 1rem;
  background: #ffffff;
  color: #fffefe;

  min-width: 21rem;

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
  align-items: center;
  margin: 2rem auto;

  &:hover {
    cursor: pointer;
  }
`;

export const DeleteButton = styled.button`
  padding: 0.7rem;
  border: none;
  padding: 0.8125rem 2.75rem;
  border-radius: 40px;
  background: #efefef;
  color: #a1a1a1;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`;

export const CloseButton = styled( DeleteButton )`
  color: white;
  background: var(--theme-color);
  padding: 0.8125rem 5rem;
`;

export const CloseAndDeleteAccountButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const DeleteAccountButton = styled.button`
  background: none;
  line-height: 0.8;
  width: 100%;
  border: none;
  display: inline;
  width: 8.19rem;
  color: #959595;
  border-bottom: 1px solid #959595;

  &:hover {
    cursor: pointer;
  }
`;
