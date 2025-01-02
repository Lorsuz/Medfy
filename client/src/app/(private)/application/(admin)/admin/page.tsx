import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import { Input } from "@drexdev/components/ui/input";
import { Label } from "@drexdev/components/ui/label";
import { Textarea } from "@drexdev/components/ui/textarea";
import { cn } from "@drexdev/lib/utils";

export default function CreateQuestion() {
  return (
    <div className={cn("max-w-[1200px] mx-auto pb-8")}>
      <header>
        <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
          Criar <span className="text-primary">questão</span>.
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
          Preencha o formulário abaixo para criar uma nova questão.
        </p>
      </header>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Informações da questão</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para criar uma nova questão.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email" className="tracking-tighter">
                    Ano da questão:
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    className={cn("h-11 rounded-lg")}
                    placeholder="Ex.: 2023"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email" className="tracking-tighter">
                    Local:
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    className={cn("h-11 rounded-lg")}
                    placeholder="Ex.: Faculdade de Tecnologia de Sorocaba"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email" className="tracking-tighter">
                    Local:
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    className={cn("h-11 rounded-lg")}
                    placeholder="Ex.: Faculdade de Tecnologia de Sorocaba"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Enunciado da questão:
                </Label>
                <Textarea
                  id="enunciation"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Enunciado da questão"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Foto da questão:
                </Label>
                <Input
                  id="image"
                  type="file"
                  className={cn("h-11 rounded-lg")}
                  placeholder="Ex.: Faculdade de Tecnologia de Sorocaba"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Alternativa A:
                </Label>

                <Textarea
                  id="optionA"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Alternativa A"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Alternativa B:
                </Label>
                
                <Textarea
                  id="optionA"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Alternativa B"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Alternativa C:
                </Label>
                
                <Textarea
                  id="optionA"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Alternativa C"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Alternativa D:
                </Label>
                
                <Textarea
                  id="optionA"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Alternativa D"
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="email" className="tracking-tighter">
                  Alternativa E:
                </Label>
                
                <Textarea
                  id="optionA"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Alternativa E"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
