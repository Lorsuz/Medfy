"use client";

import { Button } from "@drexdev/components/ui/button";
import { Card, CardContent } from "@drexdev/components/ui/card";

import { QuestionsHeader } from "./components/questions-header";
import { QuestionCardHeader } from "./components/question-card-header";
import { QuestionCardInputs } from "./components/question-card-inputs";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Questions() {
  const form = useForm();
  const router = useRouter();

  const onSubmit = form.handleSubmit((data) => {
    const modeQuestion = data.mode_question;

    const params = Object.entries(data)
      .filter(([key]) => key !== "mode_question")
      .map(([key, value]) => {
        return `${key}=${value}`;
      });

    router.push(`/app/questoes/${modeQuestion}?${params.join("&")}`);
  });

  return (
    <div className="flex flex-col pb-8 min-h-[calc(100vh-80px)]">
      <QuestionsHeader
        title={
          <span>
            Vamos estudar, <span className="text-primary">Carlos</span>?
          </span>
        }
        description={
          <span>
            Vamos preparar as questões para seu <b>estudo</b>!
          </span>
        }
      />

      <Card className="mt-5 flex-1 flex items-center justify-center">
        <CardContent className="p-8 h-full flex items-center justify-center max-w-[650px]">
          <FormProvider {...form}>
            <form
              onSubmit={onSubmit}
              className="flex items-center justify-center flex-col gap-6"
            >
              <QuestionCardHeader
                title={
                  <div>
                    Calma! Estamos preparando as{" "}
                    <span className="text-primary">questões</span>.
                  </div>
                }
                description={
                  <span>
                    Antes, selecione alguns <b>filtros</b> para nós preparar as
                    questões de acordo com suas necessidades. Caso queira deixar
                    como está, clique no botão <b>Iniciar questões</b>.
                  </span>
                }
              />

              <QuestionCardInputs />

              <Button className="w-full h-10">Iniciar questões</Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
