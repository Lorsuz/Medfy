"use client"

import * as Dialog from "@radix-ui/react-dialog";
import {
  Content,
  Overlay,
  TriggerDialogContainer,
  Title,
  Description,
  ReportQuestionButton,
  ReportButton,
  CloseButton,
  TitleAndCloseButtonContainer,
} from "./styles";

import { TiFlag } from "react-icons/ti";

import { IoCloseSharp } from "react-icons/io5";

import { useState } from "react";

interface ReportItemDialogProps {
  onConfirmReport?: () => void;
}

export default function ReportQuestionDialog({
  // onConfirmReport,
}: ReportItemDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog.Root open={open} aria-describedby={undefined}>
      <Dialog.Trigger asChild>
        <TriggerDialogContainer>
          <ReportQuestionButton onClick={() => setOpen(true)}>
            Reportar questão <TiFlag color="#de0000" />
          </ReportQuestionButton>
        </TriggerDialogContainer>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <TitleAndCloseButtonContainer>
            <Title>Qual o problema da questão?</Title>
            <CloseButton onClick={() => setOpen(false)}>
              <IoCloseSharp size={24} />
            </CloseButton>
          </TitleAndCloseButtonContainer>

          <Description>Descrição</Description>

          <textarea
            name=""
            id=""
            placeholder="Ex: questão com a resposta errada"
          />

          <ReportButton
            onClick={() => {
              setOpen(false); //editar aqui
            }}
          >
            Reportar questão
          </ReportButton>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
