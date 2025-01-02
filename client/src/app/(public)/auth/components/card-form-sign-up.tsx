"use client";

import { Button } from "@drexdev/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import { Input } from "@drexdev/components/ui/input";
import { Label } from "@drexdev/components/ui/label";
import { Loading } from "@drexdev/components/ui/loading";
import { useToast } from "@drexdev/hooks/use-toast";
import { cn } from "@drexdev/lib/utils";
import { api } from "@drexdev/utils/api";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validação usando Zod
const signUpSchema = z.object({
  firstName: z.string().min(3, "O nome é obrigatório"),
  lastName: z.string().min(3, "O sobrenome é obrigatório"),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
    .min(14, "O CPF deve seguir o formato 000.000.000-00"),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d \d{4}-\d{4}$/, "Telefone inválido")
    .min(16, "O telefone deve seguir o formato (00) 0 0000-0000"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function CardFormSignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    try {
      const response = await api.post("/user/register", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        cpf: data.cpf,
        phone: data.phone,
      });

      if (response.status === 201) {
        toast({
          title: "Cadastro realizado com sucesso!",
        });
      }
    } catch (error:any) {
      toast({
        title: "Ocorreu um erro ao fazer cadastro.",
        description: error.response?.data?.message || "Erro desconhecido.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é número
      .replace(/(\d{3})(\d)/, "$1.$2") // Primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Segundo ponto
      .replace(/(\d{3})(\d{2})$/, "$1-$2"); // Traço
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é número
      .replace(/^(\d{2})(\d)/, "($1) $2") // Coloca o DDD
      .replace(/(\d{1})(\d{4})(\d{4})$/, "$1 $2-$3"); // Separa o primeiro dígito, o meio e o final
  };

  return (
    <Card className="max-sm:w-full max-sm:min-h-screen max-sm:rounded-none border-none shadow-xl sm:max-w-[430px]">
      <CardHeader className="px-8 pt-10">
        <CardTitle className="text-xl font-medium tracking-tighter flex flex-col leading-5">
          <b className="text-primary text-3xl sm:text-2xl">Olá! 👋</b>
          <span>Que bom ter você aqui.</span>
        </CardTitle>
        <CardDescription>
          Para acessar a plataforma, preencha os campos abaixo.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="firstName" className="tracking-tighter">
                  Insira seu nome:
                </Label>
                <Input
                  {...register("firstName")}
                  id="firstName"
                  className={cn("h-11 rounded-lg")}
                  placeholder="Ex.: Carlos"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="lastName" className="tracking-tighter">
                  Insira seu sobrenome:
                </Label>
                <Input
                  {...register("lastName")}
                  id="lastName"
                  className={cn("h-11 rounded-lg")}
                  placeholder="Ex.: Silva"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="email" className="tracking-tighter">
                Insira seu e-mail:
              </Label>
              <Input
                {...register("email")}
                id="email"
                className={cn("h-11 rounded-lg")}
                placeholder="ylB3S@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="phone" className="tracking-tighter">
                  Insira seu telefone:
                </Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  onChange={(e) => {
                    setValue("phone", formatPhone(e.target.value));
                  }}
                  className={cn("h-11 rounded-lg")}
                  placeholder="(00) 0 0000-0000"
                  maxLength={16}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="cpf" className="tracking-tighter">
                  Insira seu CPF:
                </Label>
                <Input
                  {...register("cpf")}
                  id="cpf"
                  onChange={(e) => {
                    setValue("cpf", formatCPF(e.target.value));
                  }}
                  className={cn("h-11 rounded-lg")}
                  placeholder="000.000.000-00"
                  maxLength={14}
                />
                {errors.cpf && (
                  <span className="text-red-500 text-sm">
                    {errors.cpf.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="password" className="tracking-tighter">
                Insira sua senha:
              </Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                className={cn("h-11 rounded-lg")}
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 hover:bg-primary hover:opacity-80"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loading />
                  Aguarde...
                </span>
              ) : (
                "Cadastrar"
              )}
            </Button>

            <p className="text-sm text-center font-medium tracking-tight">
              Já possui uma conta?{" "}
              <Link
                href="/auth/sign-in"
                className="font-semibold text-primary hover:text-primary/90 underline underline-offset-4 tracking-tight"
              >
                Clique aqui
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
