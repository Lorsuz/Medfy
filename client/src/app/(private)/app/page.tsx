import { ArrowRight } from "lucide-react";
import { CardQuestionsComplete } from "./components/card-questions-complete";
import { ChartPerformance } from "./components/chart-performance";

export default function App() {
  return (
    <div className="flex flex-col pb-8">
      <header>
        <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
          Olá, <span className="text-primary">Carlos</span>!
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
          Bem-vindo ao seu <b>painel de controle</b>!
        </p>
      </header>

      <div className="grid xl:grid-cols-2 gap-3 mt-5">
        <CardQuestionsComplete correct={4} incorrect={2} />
        <ChartPerformance />
      </div>

      <div className="mt-4 bg-indigo-600/30 w-full min-h-20 rounded-xl p-6">
        <h1 className="text-2xl text-primary font-bold tracking-tighter">
          Sugestões de estudo
        </h1>
        <p className="text-foreground text-sm ">
          Com base nos temas com maior taxa de erro, selecionamos questões
          específicas para otimizar sua revisão.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="w-full py-3 px-4 rounded-lg bg-muted flex items-center justify-between">
            <div className="">
              <h1 className="font-semibold">Biologia Celular</h1>
              <p className="text-muted-foreground text-xs">
                <b>30%</b> de taxa de erro
              </p>
            </div>

            <ArrowRight />
          </div>

          <div className="w-full py-3 px-4 rounded-lg bg-muted flex items-center justify-between">
            <div>
              <h1 className="font-semibold">Biologia Celular</h1>
              <p className="text-muted-foreground text-xs">
                <b>30%</b> de taxa de erro
              </p>
            </div>

            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
