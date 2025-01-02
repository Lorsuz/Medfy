import { Card, CardContent } from "@drexdev/components/ui/card";
import { QuestionCardSelect } from "./question-card-select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@drexdev/components/ui/hover-card";

import { HiQuestionMarkCircle } from "react-icons/hi";

const HoverCardQuestion = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <HiQuestionMarkCircle className="text-lg" />
      </HoverCardTrigger>

      <HoverCardContent className="w-80 bg-white/40 backdrop-blur-md text-muted-foreground">
        <div className="space-y-4">
          <p className="font-normal">
            <b className="text-foreground">Simulado:</b> Todas as questões do
            simulado serão mostradas e apenas serão avaliadas depois de
            responder todas as questões.
          </p>

          <p className="font-normal">
            <b className="text-foreground">Teste:</b> Serão geradas questões
            aleatórias e poderá corrigir no momento.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export function QuestionCardInputs() {
  return (
    <Card className="bg-background rounded-lg w-full">
      <CardContent className="p-5">
        <div className="grid lg:grid-cols-2 gap-3">
          <QuestionCardSelect
            label={
              <div className="flex items-center gap-1">
                <span>Modo de questões:</span>
                <HoverCardQuestion />
              </div>
            }
            name="mode_question"
            options={[
              { label: "Simulado", value: "simulado" },
              { label: "Teste", value: "teste" },
            ]}
          />

          <QuestionCardSelect
            label="Tema:"
            name="tema"
            options={[
              { label: "Biologia", value: "biologia" },
              { label: "Física", value: "fisica" },
              { label: "Química", value: "quimica" },
            ]}
          />

          <QuestionCardSelect
            label="Ano:"
            name="ano"
            options={[
              { label: "Todos", value: "todos" },
              { label: "2024", value: "2024" },
              { label: "2023", value: "2023" },
            ]}
          />

          <QuestionCardSelect
            label="Local:"
            name="local"
            options={[
              {
                label: "Hospital das Clínicas da Famema",
                value: "Hospital das Clínicas da Famema",
              },
              {
                label: "Faculdade de Medicina de São José do Rio Preto",
                value: "Faculdade de Medicina de São José do Rio Preto",
              },
            ]}
          />

          <QuestionCardSelect
            label="Quantidade:"
            name="quantidade"
            options={[
              {
                label: "10",
                value: "10",
              },
              {
                label: "20",
                value: "20",
              },
              {
                label: "30",
                value: "30",
              },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}
