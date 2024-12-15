import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import { ChevronRight, StarIcon } from "lucide-react";

export interface QuestionOption {
  option: string;
  isRight: boolean;
}

export interface Question {
  questionId: number;
  question: string;
  justification: string;
  image?: string;
  year: number;
  collegeName: string;
  options: QuestionOption[];
  isRights: string;
  categoryId: number;
  categoryHistory: string[];
}

export default function Questions() {
  const questions: Question[] = [
    {
      questionId: 3125,
      question:
        "Qual é o principal neurotransmissor envolvido na transmissão neuromuscular?",
      justification:
        "A acetilcolina é o neurotransmissor responsável por transmitir o impulso nervoso na junção neuromuscular.",
      year: 2024,
      collegeName: "Faculdade de Medicina",
      options: [
        { option: "Acetilcolina", isRight: true },
        { option: "Dopamina", isRight: false },
        { option: "Serotonina", isRight: false },
        { option: "Noradrenalina", isRight: false },
      ],
      isRights: "Acetilcolina",
      categoryId: 201,
      categoryHistory: ["Neurociência", "Fisiologia Médica"],
    },
    {
      questionId: 5123,
      question: "Qual é o principal agente etiológico da tuberculose?",
      justification:
        "O Mycobacterium tuberculosis é a bactéria causadora da tuberculose, uma doença infecciosa que afeta principalmente os pulmões.",
      image:
        "https://qcon-assets-production.s3.amazonaws.com/images/provas/91250/Captura_de%20Tela%20%28174%29.png",
      year: 2023,
      collegeName: "Universidade de Ciências Médicas",
      options: [
        { option: "Mycobacterium tuberculosis", isRight: true },
        { option: "Staphylococcus aureus", isRight: false },
        { option: "Escherichia coli", isRight: false },
        { option: "Klebsiella pneumoniae", isRight: false },
      ],
      isRights: "Mycobacterium tuberculosis",
      categoryId: 202,
      categoryHistory: ["Infectologia", "Microbiologia"],
    },
    {
      questionId: 7842,
      question:
        "Qual é o papel do ciclo de Krebs no metabolismo energético celular?",
      justification:
        "O ciclo de Krebs é fundamental para a geração de ATP, uma vez que produz moléculas de NADH e FADH2 que transferem elétrons para a cadeia transportadora de elétrons.",
      year: 2022,
      collegeName: "Instituto de Biociências",
      options: [
        { option: "Produção de energia na forma de ATP", isRight: false },
        { option: "Geração de NADH e FADH2", isRight: true },
        { option: "Síntese de proteínas", isRight: false },
        { option: "Armazenamento de glicogênio", isRight: false },
      ],
      isRights: "Geração de NADH e FADH2",
      categoryId: 203,
      categoryHistory: ["Bioquímica", "Fisiologia"],
    },
    {
      questionId: 9001,
      question:
        "Na mecânica quântica, qual é a interpretação do princípio da incerteza de Heisenberg?",
      justification:
        "O princípio da incerteza de Heisenberg estabelece que é impossível determinar simultaneamente, com precisão, a posição e o momento de uma partícula subatômica.",
      year: 2021,
      collegeName: "Departamento de Física Teórica",
      options: [
        {
          option: "A energia de uma partícula não pode ser medida",
          isRight: false,
        },
        {
          option:
            "A posição e o momento não podem ser determinados com precisão ao mesmo tempo",
          isRight: true,
        },
        {
          option: "Partículas podem ocupar dois lugares ao mesmo tempo",
          isRight: false,
        },
        { option: "O tempo não afeta medições subatômicas", isRight: false },
      ],
      isRights:
        "A posição e o momento não podem ser determinados com precisão ao mesmo tempo",
      categoryId: 301,
      categoryHistory: ["Física Quântica", "Filosofia da Ciência"],
    },
    {
      questionId: 4512,
      question:
        "Qual é o impacto do aquecimento global sobre os ecossistemas marinhos?",
      justification:
        "O aquecimento global causa o aumento da temperatura dos oceanos, o que afeta a biodiversidade, provoca branqueamento de corais e altera os ciclos alimentares marinhos.",
      year: 2020,
      collegeName: "Faculdade de Biologia Marinha",
      options: [
        {
          option: "Aumenta a biodiversidade devido ao aquecimento das águas",
          isRight: false,
        },
        {
          option:
            "Reduz a diversidade de espécies devido às mudanças nas condições ambientais",
          isRight: true,
        },
        {
          option: "Não afeta os ecossistemas marinhos significativamente",
          isRight: false,
        },
        {
          option:
            "Melhora as condições de vida para organismos em águas profundas",
          isRight: false,
        },
      ],
      isRights:
        "Reduz a diversidade de espécies devido às mudanças nas condições ambientais",
      categoryId: 302,
      categoryHistory: ["Ecologia", "Mudanças Climáticas"],
    },
    {
      questionId: 7842,
      question:
        "Qual é o papel do ciclo de Krebs no metabolismo energético celular?",
      justification:
        "O ciclo de Krebs é fundamental para a geração de ATP, uma vez que produz moléculas de NADH e FADH2 que transferem elétrons para a cadeia transportadora de elétrons.",
      year: 2022,
      collegeName: "Instituto de Biociências",
      options: [
        { option: "Produção de energia na forma de ATP", isRight: false },
        { option: "Geração de NADH e FADH2", isRight: true },
        { option: "Síntese de proteínas", isRight: false },
        { option: "Armazenamento de glicogênio", isRight: false },
      ],
      isRights: "Geração de NADH e FADH2",
      categoryId: 203,
      categoryHistory: ["Bioquímica", "Fisiologia"],
    },
    {
      questionId: 9001,
      question:
        "Uma ameaça de guerra entre Rússia e Ucrânia veio à tona. Moscou vem sendo acusado de preparar uma invasão militar ao vizinho pró-ocidente. O país mobilizou mais de 100.000 soldados na fronteira com a Ucrânia, o que gera temores de uma invasão iminente.\n\nA rivalidade entre os países tem raízes históricas. Rússia e Ucrânia compartilham como origem o chamado Rus de Kiev, um principado que existiu entre os séculos IX e XIII. Essa entidade abrangia a Rússia contemporânea, a Ucrânia e Belarus. Moscou considera esta área como seu berço.\n\nDonbass, onde está localizada uma bacia mineira e industrial, é economicamente vital para a Ucrânia. A região fica ao leste do país e é o epicentro do conflito entre as forças de Kiev e os separatistas pró-russos apoiados por Moscou desde 2014.\n\nUma batalha cultural entre Kiev e Moscou também está no centro do conflito. Há argumentos de que a região, juntamente com grande parte do leste da Ucrânia, é povoada por uma população de língua russa que precisa ser protegida do nacionalismo ucraniano.\n\nSegundo informações da agência de notícias AFP, a russofilia da região deve-se, no entanto, à russificação forçada e ao repovoamento da região após a Segunda Guerra Mundial, com a chegada de centenas de milhares de trabalhadores russos.",
      image:
        "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2024/11/questao-anulada-biologia-enem.jpg?quality=70&strip=info&w=1024",
      justification:
        "O princípio da incerteza de Heisenberg estabelece que é impossível determinar simultaneamente, com precisão, a posição e o momento de uma partícula subatômica.",
      year: 2021,
      collegeName: "Departamento de Física Teórica",
      options: [
        {
          option:
            "os países da UE estão unanimemente a favor da democracia ucraniana, pois dependem dela para abastecer seu mercado em mais de 50% com automóveis lá montados, computadores e bens da linha branca, além de dependerem da importação do gás russo, responsável por 30% das necessidades europeias. ",
          isRight: false,
        },
        {
          option:
            "A posição e o momento não podem ser determinados com precisão ao mesmo tempo",
          isRight: true,
        },
        {
          option: "Partículas podem ocupar dois lugares ao mesmo tempo",
          isRight: false,
        },
        { option: "O tempo não afeta medições subatômicas", isRight: false },
      ],
      isRights:
        "A posição e o momento não podem ser determinados com precisão ao mesmo tempo",
      categoryId: 301,
      categoryHistory: ["Física Quântica", "Filosofia da Ciência"],
    },
    {
      questionId: 4512,
      question:
        "Qual é o impacto do aquecimento global sobre os ecossistemas marinhos?",
      justification:
        "O aquecimento global causa o aumento da temperatura dos oceanos, o que afeta a biodiversidade, provoca branqueamento de corais e altera os ciclos alimentares marinhos.",
      year: 2020,
      collegeName: "Faculdade de Biologia Marinha",
      options: [
        {
          option: "Aumenta a biodiversidade devido ao aquecimento das águas",
          isRight: false,
        },
        {
          option:
            "Reduz a diversidade de espécies devido às mudanças nas condições ambientais",
          isRight: true,
        },
        {
          option: "Não afeta os ecossistemas marinhos significativamente",
          isRight: false,
        },
        {
          option:
            "Melhora as condições de vida para organismos em águas profundas",
          isRight: false,
        },
      ],
      isRights:
        "Reduz a diversidade de espécies devido às mudanças nas condições ambientais",
      categoryId: 302,
      categoryHistory: ["Ecologia", "Mudanças Climáticas"],
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      <header>
        <h1 className="text-2xl font-bold tracking-tighter">
          Questões <span className="text-primary">simuladas</span>.
        </h1>
        <p className="text-muted-foreground text-sm max-w-96">
          Você está fazendo o simulado, você só pode visualizar seus erros e
          acertos após responder todas as questões.
        </p>
      </header>

      <div className="flex flex-col gap-1.5 mt-8">
        {questions.map((question, index) => (
          <Card className="shadow-none rounded-xl px-4 py-2" key={index}>
            <CardHeader>
              <div>
                <div className="bg-[#f3f3f3] flex gap-5 items-center h-7 text-muted-foreground">
                  <span className="bg-[#d9d9d9] h-full flex items-center px-4 text-sm font-semibold">
                    ID: {question.questionId}
                  </span>

                  {question.categoryHistory.map((category, index) => (
                    <span
                      key={index}
                      className="h-full flex gap-4 items-center text-sm font-medium"
                    >
                      {category}

                      {index !== question.categoryHistory.length - 1 && (
                        <ChevronRight size={16} />
                      )}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[13px] mt-2">
                  <span>
                    <b>Ano:</b> {question.year}
                  </span>
                  <span>
                    <b>Local:</b> {question.collegeName}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <h1 className="text-base font-medium leading-7 text-justify">
                  {question.question}
                </h1>

                {question.image && (
                  <Image
                    src={question.image}
                    alt="imagem"
                    width={1000}
                    height={1000}
                    className="w-auto h-auto max-w-96 mt-4 !rounded-2xl"
                  />
                )}

                <div className="mt-6 ml-5 flex flex-col gap-2">
                  {question.options.map((option, index) => (
                    <div key={index} className="text-[13px]">
                      <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-[#d9d9d9] flex items-center justify-center">
                          {String.fromCharCode(65 + index)}
                        </div>

                        <span className="text-base">{option.option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <StarIcon size={16} />
                  <span className="text-[13px] cursor-pointer">
                    Marcar questão para revisão
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
