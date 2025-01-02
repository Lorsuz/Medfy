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
import { cn } from "@drexdev/lib/utils";
import { useAuth } from "@drexdev/providers/auth-provider";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function CardFormSignIn() {
  const { login } = useAuth<false>();
  const form = useForm();

  const onSubmit = form.handleSubmit(async (data) => {
    const response = await login(data.email, data.password);
    console.log(response);
  });

  return (
    <Card className="max-sm:w-full max-sm:min-h-screen max-sm:rounded-none border-none shadow-xl sm:max-w-96">
      <CardHeader className="px-8 pt-10">
        <CardTitle className="text-xl font-medium tracking-tighter flex flex-col leading-5">
          <b className="text-primary text-3xl sm:text-2xl">Olá! 👋</b>
          <span>Que bom ter voce aqui.</span>
        </CardTitle>
        <CardDescription>
          Para acessar a plataforma, preencha os campos abaixo.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8">
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="email" className="tracking-tighter">
                Insira seu e-mail:
              </Label>
              <Input
                {...form.register("email")}
                id="email"
                type="email"
                className={cn("h-11 rounded-lg")}
                placeholder="ylB3S@example.com"
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex items-end justify-between">
                <Label htmlFor="password" className="tracking-tighter">
                  Insira sua senha:
                </Label>

                <Link
                  href="/auth/forgot-password"
                  className="text-[13px] font-medium hover:text-primary text-muted-foreground underline underline-offset-4 tracking-tight"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <Input
                {...form.register("password")}
                id="password"
                type="password"
                className={cn("h-11 rounded-lg")}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 hover:bg-primary hover:opacity-80"
            >
              Entrar
            </Button>

            <p className="text-sm text-center font-medium tracking-tight">
              Não possui uma conta?{" "}
              <Link
                href="/auth/sign-up"
                className="font-semibold text-primary hover:text-primary/90 underline underline-offset-4 tracking-tight"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
