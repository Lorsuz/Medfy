"use client"
import * as Dialog from "@radix-ui/react-dialog";
import {
  Content,
  Overlay,
  CloseButton,
  DeleteButton,
  CloseAndDeleteAccountButtonsContainer,
  DeleteAccountButton,
  TriggerDialogContainer,
  Title,
  Description,
} from "./styles";

import { FaRegTrashAlt } from "react-icons/fa";

import { useState } from "react";

interface DeleteItemDialogProps {
  onConfirmDelete?: () => void;
}

export default function DeleteAccountDialog({
  // onConfirmDelete,
}: DeleteItemDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog.Root open={open} aria-describedby={undefined}>
      <Dialog.Trigger asChild>
        <TriggerDialogContainer>
          <DeleteAccountButton
            onClick={() => setOpen(true)}
            data-testid="delete-item-button"
          >
            Excluir minha conta
          </DeleteAccountButton>
          <FaRegTrashAlt color="#959595" size={15} />
        </TriggerDialogContainer>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>Tem certeza que deseja excluir sua conta?</Title>

          <Description>
            Se prosseguir com a exclusão da conta, seus dados, histórico de
            questões e informações financeiras serão apagados nosso sistema. Se
            continuar com essa ação, você não poderá mais criar uma conta na
            Medfy Academy com este e-mail.
          </Description>

          <CloseAndDeleteAccountButtonsContainer>
            <DeleteButton
            //   onClick={() => {
            //     onConfirmDelete(), setOpen(false);
            //   }}
            >
              Excluir minha conta
            </DeleteButton>
            <CloseButton onClick={() => setOpen(false)}>Cancelar</CloseButton>
          </CloseAndDeleteAccountButtonsContainer>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
