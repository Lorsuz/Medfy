import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@drexdev/components/ui/avatar";
import { Button } from "@drexdev/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import { Input } from "@drexdev/components/ui/input";
import { Label } from "@drexdev/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@drexdev/components/ui/select";
import { Edit } from "lucide-react";

export default function Profile() {
  return (
    <div className="flex flex-col pb-8">
      <header>
        <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">
          Perfil do <span className="text-primary">Usuario</span>!
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm max-w-96">
          Olá, <b>Carlos</b>! Visualize seus dados cadastrais e altere-os.
        </p>
      </header>

      <div className="grid xl:grid-cols-2 gap-3 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
            <CardDescription>Visualize seus dados cadastrais</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid sm:grid-cols-[auto_1fr] gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://github.com/drexdev.png" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>

                <Button
                  className="absolute bottom-4 right-0 rounded-full w-8 h-8"
                  variant={"outline"}
                >
                  <Edit />
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name">Nome:</Label>
                  <Input
                    id="name"
                    defaultValue="Carlos"
                    type="text"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email">E-mail:</Label>
                  <Input
                    id="email"
                    defaultValue="carlos.nt39@gmail.com"
                    type="email"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="phone">Telefone:</Label>
                  <Input
                    id="phone"
                    defaultValue="+55 11 99999-9999"
                    type="tel"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="cpf">CPF:</Label>
                  <Input
                    id="cpf"
                    value="999.***.***-*9"
                    type="text"
                    maxLength={30}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-3">
            <div className="flex items-center justify-end w-full">
              <div className="grid grid-cols-2 gap-1">
                <Button
                  className="hover:border-red-500 hover:text-red-500"
                  variant="outline"
                  disabled
                >
                  Cancelar alterações
                </Button>

                <Button className="hover:bg-primary" disabled>
                  Salvar
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formação acadêmica</CardTitle>
            <CardDescription>
              Visualize e altere seus dados de formação acadêmica
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="name_school">Faculdade:</Label>
                  <Input
                    id="name"
                    value="URFGS"
                    type="text"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="course">Período:</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Período</SelectLabel>
                        <SelectItem value="1">1º</SelectItem>
                        <SelectItem value="2">2º</SelectItem>
                        <SelectItem value="3">3º</SelectItem>
                        <SelectItem value="4">4º</SelectItem>
                        <SelectItem value="5">5º</SelectItem>
                        <SelectItem value="6">6º</SelectItem>
                        <SelectItem value="7">7º</SelectItem>
                        <SelectItem value="8">8º</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="area">Área de residência pretendida:</Label>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a area" />
                    </SelectTrigger>

                    <SelectContent className="max-h-[200px]">
                      <SelectGroup>
                        <SelectLabel>Área</SelectLabel>
                        <SelectItem value="cardiologia">Cardiologia</SelectItem>
                        <SelectItem value="pediatria">Pediatria</SelectItem>
                        <SelectItem value="neurologia">Neurologia</SelectItem>
                        <SelectItem value="geriatria">Geriatria</SelectItem>
                        <SelectItem value="ortopedia">Ortopedia</SelectItem>
                        <SelectItem value="oftalmologia">
                          Oftalmologia
                        </SelectItem>
                        <SelectItem value="ginecologia">Ginecologia</SelectItem>
                        <SelectItem value="psiquiatria">Psiquiatria</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="course">Ano de formação:</Label>
                  <Input
                    id="course"
                    value="2024"
                    type="number"
                    maxLength={30}
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="pt-3">
            <div className="flex items-center justify-end w-full">
              <div className="grid grid-cols-2 gap-1">
                <Button
                  className="hover:border-red-500 hover:text-red-500"
                  variant="outline"
                  disabled
                >
                  Cancelar alterações
                </Button>

                <Button className="hover:bg-primary" disabled>
                  Salvar
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-3 grid lg:grid-cols-[2fr_1fr] gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary font-semibold">
              Por onde você nos conheceu?
            </CardTitle>
            <CardDescription>
              Visualize e altere seus dados de formação acadêmica
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col space-y-1 w-full">
                <Label htmlFor="name_school">Escolha uma opção:</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Escolha uma opção</SelectLabel>
                      <SelectItem value="1">Facebook</SelectItem>
                      <SelectItem value="2">Instagram</SelectItem>
                      <SelectItem value="3">Linkedin</SelectItem>
                      <SelectItem value="4">Twitter</SelectItem>
                      <SelectItem value="5">Outros</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-end w-full">
              <Button className="hover:bg-primary min-w-40" disabled>
                Salvar
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sua conta</CardTitle>
            <CardDescription>
              Altere sua senha ou exclua sua conta.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full">
            <Button className="w-full h-10 hover:bg-primary">Alterar senha</Button>

            <Button className="w-full h-10 mt-2" variant="destructive">
              Excluir minha conta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
