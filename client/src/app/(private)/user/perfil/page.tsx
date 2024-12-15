"use client";

import { useReducer, useState } from "react";

import Image from "next/image";

import { useDropzone } from "react-dropzone";

import emptyAvatar from "@image/empty_avatart_icon.svg";

import MaskedInput from "react-text-mask";

import { useForm, Controller } from "react-hook-form";

import {
  ProfileContainer,
  ProfileContent,
  AvatarImageContainer,
  Avatar,
  AvatarWithoutImageContainer,
  ProfileDataAndAcademicInfo,
  AcademicInfoContent,
  ProfileDataContent,
  LabelAndInputContainer,
  LabelAndSelectContainer,
  TwoInputsContainer,
  PasswordDataContent,
  TitleAndEditButtonContainer,
  EditButton,
  SaveButton,
  CurrentPasswordAndForgotPasswordContainer,
  ForgotPassword,
  HowDidYouMeetMedfyContent,
  TotalAccessAndTotalSignaturesContainer,
  TotalAccessContainer,
  TotalSignaturesContainer,
  TitleAndContent,
  ManageQuestionContainer,
  AddQuestionButtonManually,
  AddQuestionManuallyContainer,
  ListOfQuestionsLink,
  AddQuestionManuallyForm,
  YearDifficultAndLocaleOfQuestion,
  LabelAndInput,
  LabelAndTextArea,
  SaveQuestionButton,
  ManageUserContainer,
  InputAndSearchButtonContainer,
  InputWrapper,
  ListOfUserContainer,
  AddQuestionButtonAndSvgContainer,
  PDFNameAndSvgContainer,
  AddQuestionButton,
  AddQuestionButtonWithPDFContainer,
  AdminProfileContent,
  PlanManageContainer,
  PlanContainer,
  PlanLabelAndInput,
  PlanLabelAndSelect,
  AddPlanButtonManually,
  EditButtonAndLabelContainer,
  SavePlanButton,
} from "./styles";
import { CiCirclePlus, CiImport, CiSearch } from "react-icons/ci";

import { IoMdClose } from "react-icons/io";

import { LiaPaperclipSolid } from "react-icons/lia";

import { GoBook } from "react-icons/go";

// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import SideBar from "@/components/partials/SideBar";
// import DeleteAccountDialog from "@/components/deleteAccountDialog";
import QuestionsAnswered from "@/components/questionsAnswered";
import LabelAndSelectTemplate from "@/components/labelAndSelectTemplate";
import { userStore } from "@/store/authStore";

interface Plan {
  id: number;
  name: string;
  period: string;
  duration: string;
  value: string;
}

type PlanState = {
  plans: Plan[];
  editingPlanIds: number[];
};

type PlanManagement =
  | { type: "ADD_PLAN" }
  | { type: "UPDATE_PLAN"; id: number; field: keyof Plan; value: string }
  | { type: "REMOVE_PLAN"; id: number }
  | { type: "START_EDITING"; id: number }
  | { type: "SAVE_EDITING"; id: number };

/* export */ const planReducer = (
  state: PlanState,
  action: PlanManagement
): PlanState => {
  switch (action.type) {
    case "ADD_PLAN":
      const newPlan: Plan = {
        id: Date.now(),
        name: `Plano ${state.plans.length + 1}`,
        period: "",
        duration: "1month",
        value: "",
      };
      return { ...state, plans: [...state.plans, newPlan] };

    case "UPDATE_PLAN":
      return {
        ...state,
        plans: state.plans.map((plan) =>
          plan.id === action.id
            ? { ...plan, [action.field]: action.value }
            : plan
        ),
      };

    case "REMOVE_PLAN":
      return {
        ...state,
        plans: state.plans.filter((plan) => plan.id !== action.id),
        editingPlanIds: state.editingPlanIds.filter((id) => id !== action.id),
      };

    case "START_EDITING":
      return {
        ...state,
        editingPlanIds: [...state.editingPlanIds, action.id],
      };

    case "SAVE_EDITING":
      return {
        ...state,
        editingPlanIds: state.editingPlanIds.filter((id) => id !== action.id),
      };

    default:
      return state;
  }
};

export default function Profile() {
  const [, /* avatarImage */ setAvatarImage] = useState<File[] | null>();
  const [, /* pdfFile */ setPdfFile] = useState<File[] | null>();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [PDFPreview, setPDFPreview] = useState<string | null>();
  const [isEditingPersonalInformation, setIsEditingPersonalInformation] =
    useState<boolean>(false);
  const [isEditingAcademicInformation, setIsEditingAcademicInformation] =
    useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
  const { control /* , handleSubmit */ } = useForm();
  // const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isAddingManually, setIsAddingManually] = useState<boolean>(false);
  const [isAddingPDFQuestion, setIsAddingPDFQuestion] =
    useState<boolean>(false);
  const user = userStore((state) => state.user);

  const isEditingPlan = (id: number) => state.editingPlanIds.includes(id);

  const [state, dispatch] = useReducer(planReducer, {
    plans: [],
    editingPlanIds: [],
  });

  function onDropAvatarImage(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    setAvatarImage(acceptedFiles);
    setImagePreview(URL.createObjectURL(file));
  }

  const avatarImageUpload = useDropzone({
    onDrop: onDropAvatarImage,
    accept: {
      "image/*": [],
    },
  });

  function handleAddPlan() {
    dispatch({ type: "ADD_PLAN" });
  }

  function onDropPdf(acceptedFiles: File[]) {
    const file = acceptedFiles[0];
    console.log("Arquivo recebido:", file);
    setPdfFile(acceptedFiles);
    setPDFPreview(file.name);
  }

  const pdfUpload = useDropzone({
    onDrop: onDropPdf,
    accept: {
      "application/pdf": [],
    },
  });

  function handleUpdatePlan(id: number, field: keyof Plan, value: string) {
    dispatch({ type: "UPDATE_PLAN", id, field, value });
  }

  return (
    <ProfileContainer>
      {user && !user.isAdmin ? (
        <TitleAndContent>
          <h1>Perfil do usuário</h1>
          <ProfileContent>
            <ProfileDataAndAcademicInfo>
              <ProfileDataContent>
                <TitleAndEditButtonContainer>
                  <h2>Informações pessoais</h2>
                  {isEditingPersonalInformation ? (
                    <SaveButton
                      onClick={() => setIsEditingPersonalInformation(false)}
                    >
                      Salvar
                    </SaveButton>
                  ) : (
                    <EditButton
                      onClick={() => setIsEditingPersonalInformation(true)}
                    >
                      Editar
                    </EditButton>
                  )}
                </TitleAndEditButtonContainer>

                {imagePreview ? (
                  <AvatarImageContainer
                    $isEditing={
                      isEditingPersonalInformation === true ? "true" : "false"
                    }
                  >
                    <Avatar
                      role="img"
                      src={imagePreview}
                      {...avatarImageUpload.getRootProps()}
                    />
                    <input
                      {...avatarImageUpload.getInputProps()}
                      disabled={!isEditingPersonalInformation}
                    />
                  </AvatarImageContainer>
                ) : (
                  <AvatarWithoutImageContainer
                    $isEditing={
                      isEditingPersonalInformation === true ? "true" : "false"
                    }
                  >
                    <Image
                      {...avatarImageUpload.getRootProps()}
                      src={emptyAvatar}
                      width={93}
                      height={93}
                      alt="empty avatar icon"
                    />

                    <input
                      {...avatarImageUpload.getInputProps()}
                      disabled={!isEditingPersonalInformation}
                    />
                  </AvatarWithoutImageContainer>
                )}
                <TwoInputsContainer>
                  <LabelAndInputContainer>
                    <label htmlFor="name">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Digite seu nome competo"
                      disabled={!isEditingPersonalInformation}
                    />
                  </LabelAndInputContainer>
                  <LabelAndInputContainer>
                    <label>Celular</label>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <MaskedInput
                          {...field}
                          mask={[
                            "(",
                            /[1-9]/,
                            /\d/,
                            ")",
                            " ",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            "-",
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                          ]}
                          placeholder="Digite seu telefone"
                          type="text"
                          disabled={!isEditingPersonalInformation}
                        />
                      )}
                    />
                  </LabelAndInputContainer>
                </TwoInputsContainer>
                <TwoInputsContainer>
                  <LabelAndInputContainer>
                    <label htmlFor="email">E-mail</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Digite o seu email"
                      disabled={!isEditingPersonalInformation}
                    />
                  </LabelAndInputContainer>
                  <LabelAndInputContainer>
                    <label htmlFor="CPF">CPF</label>
                    <input
                      type="text"
                      id="CPF"
                      placeholder="Digite o seu CPF"
                      disabled={!isEditingPersonalInformation}
                    />
                  </LabelAndInputContainer>
                </TwoInputsContainer>
              </ProfileDataContent>
              <PasswordDataContent>
                <TitleAndEditButtonContainer>
                  <h2>Senha</h2>
                  {isEditingPassword ? (
                    <SaveButton onClick={() => setIsEditingPassword(false)}>
                      Salvar
                    </SaveButton>
                  ) : (
                    <EditButton onClick={() => setIsEditingPassword(true)}>
                      Editar
                    </EditButton>
                  )}
                </TitleAndEditButtonContainer>

                {isEditingPassword ? (
                  <>
                    <CurrentPasswordAndForgotPasswordContainer>
                      <LabelAndInputContainer>
                        <label htmlFor="password">Senha atual</label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Ex: senha"
                        />
                      </LabelAndInputContainer>
                      <ForgotPassword>Esqueci a senha</ForgotPassword>
                    </CurrentPasswordAndForgotPasswordContainer>
                    <LabelAndInputContainer>
                      <label htmlFor="password">Nova senha </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Ex: senha"
                      />
                    </LabelAndInputContainer>
                    <LabelAndInputContainer>
                      <label htmlFor="password">Confirme sua senha </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Ex: senha"
                      />
                    </LabelAndInputContainer>
                  </>
                ) : (
                  <LabelAndInputContainer>
                    <label htmlFor="password">Senha atual</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Ex: senha"
                      disabled={true}
                    />
                  </LabelAndInputContainer>
                )}
              </PasswordDataContent>

              <AcademicInfoContent>
                <TitleAndEditButtonContainer>
                  <h2>Informações acadêmicas</h2>

                  {isEditingAcademicInformation ? (
                    <SaveButton
                      onClick={() => setIsEditingAcademicInformation(false)}
                    >
                      Salvar
                    </SaveButton>
                  ) : (
                    <EditButton
                      onClick={() => setIsEditingAcademicInformation(true)}
                    >
                      Editar
                    </EditButton>
                  )}
                </TitleAndEditButtonContainer>
                <TwoInputsContainer>
                  <LabelAndInputContainer>
                    <label htmlFor="university">Faculdade</label>
                    <input
                      type="text"
                      id="university"
                      placeholder="Ex: UFRGS"
                      disabled={!isEditingAcademicInformation}
                    />
                  </LabelAndInputContainer>
                  <LabelAndInputContainer>
                    <label htmlFor="period">Período</label>
                    <input
                      type="text"
                      id="period"
                      placeholder="Ex: 1°Periodo"
                      disabled={!isEditingAcademicInformation}
                    />
                  </LabelAndInputContainer>
                </TwoInputsContainer>
                <TwoInputsContainer>
                  <LabelAndSelectContainer>
                    <LabelAndInputContainer>
                      <label htmlFor="residence">
                        Área de residência pretendida
                      </label>
                      <input
                        type="text"
                        id="residence"
                        placeholder="Ex: Cardiologia"
                        disabled={!isEditingAcademicInformation}
                      />
                    </LabelAndInputContainer>
                  </LabelAndSelectContainer>

                  <LabelAndInputContainer>
                    <label htmlFor="residence">Ano de formação</label>
                    <input
                      type="text"
                      id="residence"
                      placeholder="Ex: 2024"
                      disabled={!isEditingAcademicInformation}
                    />
                  </LabelAndInputContainer>
                </TwoInputsContainer>
              </AcademicInfoContent>
              <HowDidYouMeetMedfyContent>
                <h2>Como você conheceu a plataforma?</h2>
                <input
                  type="text"
                  id="residence"
                  placeholder="Ex: Conheci por indicação de um amigo"
                />
              </HowDidYouMeetMedfyContent>
            </ProfileDataAndAcademicInfo>
          </ProfileContent>
        </TitleAndContent>
      ) : (
        <TitleAndContent>
          <h1>Perfil do administrador</h1>
          <AdminProfileContent>
            <TotalAccessAndTotalSignaturesContainer>
              <TotalAccessContainer>
                <h2>Total de acessos</h2>
                <p>1.100</p>
                <span>Atualizado hoje 15:25</span>
              </TotalAccessContainer>
              <TotalSignaturesContainer>
                <h2>Total de assinaturas</h2>
                <p>893</p>
                <span>Atualizado hoje 15:25</span>
              </TotalSignaturesContainer>
            </TotalAccessAndTotalSignaturesContainer>
            <QuestionsAnswered
              correctQuestions={1893}
              questions={2300}
              wrongQuestions={407}
            />
            <ManageQuestionContainer>
              <h2>Gerenciador de questões</h2>
              <AddQuestionManuallyContainer>
                <AddQuestionButtonManually
                  onClick={() => setIsAddingManually((prev) => !prev)}
                >
                  <CiCirclePlus color="var(--theme-color)" size={28} />
                  <p>Adicionar questões manualmente </p>
                </AddQuestionButtonManually>
                {isAddingManually && (
                  <AddQuestionManuallyForm>
                    <YearDifficultAndLocaleOfQuestion>
                      <LabelAndInput>
                        <label htmlFor="yearOfQuestion">Ano da questão</label>
                        <input
                          id="yearOfQuestion"
                          type="text"
                          placeholder="Ex: 2024"
                        />
                      </LabelAndInput>
                      <LabelAndSelectTemplate
                        name="Categoria"
                        options={[{ name: "pediatria" }]}
                        svgIcon={false}
                      />
                      <LabelAndInput>
                        <label htmlFor="localeOfQuestion">Dificuldade</label>

                        <input
                          id="localeOfQuestion"
                          type="text"
                          placeholder="UFRGS"
                        />
                      </LabelAndInput>
                    </YearDifficultAndLocaleOfQuestion>
                    <LabelAndTextArea>
                      <label htmlFor="description">Descrição</label>
                      <textarea name="description" id="description"></textarea>
                    </LabelAndTextArea>
                    <LabelAndInput>
                      <label htmlFor="questionA">Alternativa A</label>

                      <input
                        id="questionA"
                        type="text"
                        placeholder="Ex: coração fica do lado esquerdo"
                      />
                    </LabelAndInput>
                    <LabelAndInput>
                      <label htmlFor="questionB">Alternativa B</label>

                      <input
                        id="questionB"
                        type="text"
                        placeholder="Ex: coração fica do lado esquerdo"
                      />
                    </LabelAndInput>
                    <LabelAndInput>
                      <label htmlFor="questionC">Alternativa C</label>

                      <input
                        id="questionC"
                        type="text"
                        placeholder="Ex: coração fica do lado esquerdo"
                      />
                    </LabelAndInput>
                    <LabelAndInput>
                      <label htmlFor="questionD">Alternativa D</label>

                      <input
                        id="questionD"
                        type="text"
                        placeholder="Ex: coração fica do lado esquerdo"
                      />
                    </LabelAndInput>
                    <LabelAndInput>
                      <label htmlFor="questionE">Alternativa E</label>

                      <input
                        id="questionE"
                        type="text"
                        placeholder="Ex: coração fica do lado esquerdo"
                      />
                    </LabelAndInput>
                    <LabelAndInput>
                      <label htmlFor="correctAlternative">
                        Alternativa Correta
                      </label>

                      <input
                        id="correctAlternative"
                        type="text"
                        placeholder="Ex: alternativa A"
                      />
                    </LabelAndInput>
                    <LabelAndTextArea>
                      <label htmlFor="description">
                        Justificativa da correção
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Ex: o coração fica do lado direito não esquerdo"
                      ></textarea>
                    </LabelAndTextArea>
                    <SaveQuestionButton>Salvar questão</SaveQuestionButton>
                  </AddQuestionManuallyForm>
                )}
              </AddQuestionManuallyContainer>

              <AddQuestionButtonWithPDFContainer>
                <AddQuestionButtonAndSvgContainer
                  onClick={() => setIsAddingPDFQuestion((prev) => !prev)}
                >
                  <CiImport color="var(--theme-color)" size={28} />
                  <p>Importar questão por PDF </p>
                </AddQuestionButtonAndSvgContainer>

                {PDFPreview && (
                  <PDFNameAndSvgContainer>
                    <LiaPaperclipSolid size={25} color="#5C5C5C" />
                    {PDFPreview}
                    <span
                      onClick={() => {
                        setPDFPreview(undefined);
                        setPdfFile(null);
                      }}
                    >
                      <IoMdClose size={25} color="#5C5C5C" />
                    </span>
                  </PDFNameAndSvgContainer>
                )}

                {isAddingPDFQuestion && (
                  <AddQuestionButton {...pdfUpload.getRootProps()}>
                    Importar
                    <input {...pdfUpload.getInputProps()} />
                  </AddQuestionButton>
                )}
              </AddQuestionButtonWithPDFContainer>
              <ListOfQuestionsLink>
                <GoBook color="var(--theme-color)" size={24} />
                Lista de questões
              </ListOfQuestionsLink>
            </ManageQuestionContainer>
            <ManageUserContainer>
              <h2>Gerenciador de usuário</h2>
              <InputAndSearchButtonContainer>
                <InputWrapper>
                  <input type="search" placeholder="Buscar usuário" />
                  <CiSearch color="#ADADAD" size={22} />
                </InputWrapper>
              </InputAndSearchButtonContainer>

              <h3>Lista de usuários</h3>
              <ListOfUserContainer>
                <p>Eduarda Souza</p>
                <span>eduardasouze@gmail.com</span>
              </ListOfUserContainer>
              <ListOfUserContainer>
                <p>Eduarda Souza</p>
                <span>eduardasouze@gmail.com</span>
              </ListOfUserContainer>
              <ListOfUserContainer>
                <p>Eduarda Souza</p>
                <span>eduardasouze@gmail.com</span>
              </ListOfUserContainer>
            </ManageUserContainer>
            <PlanManageContainer>
              <h2>Gerenciamento de planos</h2>

              <PlanContainer>
                <span>Plano teste</span>
                <PlanLabelAndInput>
                  <label htmlFor="">Período de acesso gratuito</label>
                  <input type="text" placeholder="Ex: plano trimestral" />
                </PlanLabelAndInput>
              </PlanContainer>

              <AddPlanButtonManually onClick={handleAddPlan}>
                <CiCirclePlus color="var(--theme-color)" size={28} />
                <p>Adicionar plano </p>
              </AddPlanButtonManually>

              {state.plans.map((plan) => (
                <PlanContainer key={plan.id}>
                  <span>{plan.name}</span>
                  <PlanLabelAndInput>
                    <EditButtonAndLabelContainer>
                      <label htmlFor="period">Nome do plano</label>
                      {isEditingPlan(plan.id) ? (
                        <SavePlanButton
                          onClick={() =>
                            dispatch({ type: "SAVE_EDITING", id: plan.id })
                          }
                        >
                          Salvar
                        </SavePlanButton>
                      ) : (
                        <EditButton
                          onClick={() =>
                            dispatch({ type: "START_EDITING", id: plan.id })
                          }
                        >
                          Editar
                        </EditButton>
                      )}
                    </EditButtonAndLabelContainer>
                    <input
                      type="text"
                      id={`period-${plan.id}`}
                      placeholder="Ex: plano trimestral"
                      value={plan.period}
                      onChange={(e) =>
                        handleUpdatePlan(plan.id, "period", e.target.value)
                      }
                    />
                  </PlanLabelAndInput>
                  <PlanLabelAndSelect>
                    <label htmlFor="planDuration">Duração do plano</label>
                    <select
                      id={`planDuration-${plan.id}`}
                      value={plan.duration}
                      onChange={(e) =>
                        handleUpdatePlan(plan.id, "duration", e.target.value)
                      }
                    >
                      <option value="1month">1 mês</option>
                      <option value="6months">6 meses</option>
                      <option value="1year">1 ano</option>
                    </select>
                  </PlanLabelAndSelect>
                  <PlanLabelAndInput>
                    <label htmlFor="planValue">Valor do plano</label>
                    <input
                      type="text"
                      id={`planValue-${plan.id}`}
                      placeholder="Ex: R$ 89,90"
                      value={plan.value}
                      onChange={(e) =>
                        handleUpdatePlan(plan.id, "value", e.target.value)
                      }
                    />
                  </PlanLabelAndInput>
                </PlanContainer>
              ))}
            </PlanManageContainer>
          </AdminProfileContent>
        </TitleAndContent>
      )}
    </ProfileContainer>
  );
}
