"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import confirmIcon from "@image/confirm_icon.svg";
import {
  PasswordResetSendPasswordContainer,
  PasswordResetSendPasswordContent,
  ReSendEmailAndNoticeWaitContainer,
  ReSendEmailButton,
} from "./styles";
import { use } from "react";

export default function PasswordResetSend({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const decodedEmail = decodeURIComponent(resolvedParams.email);

  return (
    <PasswordResetSendPasswordContainer>
      <PasswordResetSendPasswordContent>
        <Image alt="confirm logo image" src={confirmIcon} />

        <h2>Link enviado</h2>
        <p>
          {`O link de recuperação foi enviado para o e-mail ${decodedEmail}`}
        </p>

        <ReSendEmailAndNoticeWaitContainer>
          <p>Aguarde 30 segundos para tentar novamente</p>
          <ReSendEmailButton onClick={() => router.push("/")}>
            Reenviar email
          </ReSendEmailButton>
        </ReSendEmailAndNoticeWaitContainer>
      </PasswordResetSendPasswordContent>
    </PasswordResetSendPasswordContainer>
  );
}
