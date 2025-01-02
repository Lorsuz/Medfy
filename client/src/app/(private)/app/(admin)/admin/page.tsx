"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@drexdev/components/ui/card";
import { Input } from "@drexdev/components/ui/input";
import { Label } from "@drexdev/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@drexdev/components/ui/select";
import { Textarea } from "@drexdev/components/ui/textarea";
import { cn } from "@drexdev/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@drexdev/components/ui/button";

const questionSchema = z.object({
  year: z
    .number()
    .min(1900, "Ano deve ser maior ou igual a 1900")
    .max(new Date().getFullYear(), "Ano não pode ser maior que o atual"),
  college: z.string().nonempty("O local é obrigatório"),
  enunciation: z.string().nonempty("O enunciado é obrigatório"),
  image: z
    .instanceof(FileList)
    .refine(
      (files) => files.length === 0 || files[0]?.type.startsWith("image/"),
      "Envie uma imagem válida"
    ),
  optionA: z.string().nonempty("Alternativa A é obrigatória"),
  optionB: z.string().nonempty("Alternativa B é obrigatória"),
  optionC: z.string().nonempty("Alternativa C é obrigatória"),
  optionD: z.string().nonempty("Alternativa D é obrigatória"),
  optionE: z.string().nonempty("Alternativa E é obrigatória"),
  correctOption: z.enum(["A", "B", "C", "D", "E"], {
    message: "Selecione uma alternativa correta",
  }),
});

type QuestionFormData = z.infer<typeof questionSchema>;

export default function CreateQuestion() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    mode: "onBlur",
  });

  const watchImage = watch("image");

  const onSubmit = (data: QuestionFormData) => {
    console.log("Dados enviados:", data);
  };

  const isUploadMode = watchImage?.length > 0;

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
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="year" className="tracking-tighter">
                    Ano da questão:
                  </Label>
                  <Input
                    id="year"
                    type="number"
                    className={cn("h-11 rounded-lg")}
                    placeholder="Ex.: 2023"
                    {...register("year", { valueAsNumber: true })}
                    disabled={isUploadMode}
                  />
                  {errors.year && (
                    <span className="text-red-500 text-sm">
                      {errors.year.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col space-y-1">
                  <Label htmlFor="college" className="tracking-tighter">
                    Local:
                  </Label>
                  <Input
                    id="college"
                    type="text"
                    className={cn("h-11 rounded-lg")}
                    placeholder="Ex.: Faculdade de Tecnologia de Sorocaba"
                    {...register("college")}
                    disabled={isUploadMode}
                  />
                  {errors.college && (
                    <span className="text-red-500 text-sm">
                      {errors.college.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="enunciation" className="tracking-tighter">
                  Enunciado da questão:
                </Label>
                <Textarea
                  id="enunciation"
                  className={cn("h-24 rounded-lg")}
                  placeholder="Ex.: Enunciado da questão"
                  {...register("enunciation")}
                  disabled={isUploadMode}
                />
                {errors.enunciation && (
                  <span className="text-red-500 text-sm">
                    {errors.enunciation.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label htmlFor="image" className="tracking-tighter">
                  Foto da questão:
                </Label>
                <Input
                  id="image"
                  type="file"
                  className={cn("h-11 rounded-lg")}
                  {...register("image")}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">
                    {errors.image.message}
                  </span>
                )}
              </div>

              {/* Alternativas */}
              {["A", "B", "C", "D", "E"].map((option) => (
                <div className="flex flex-col space-y-1" key={option}>
                  <Label
                    htmlFor={`option${option}`}
                    className="tracking-tighter"
                  >
                    Alternativa {option}:
                  </Label>
                  <Textarea
                    id={`option${option}`}
                    className={cn("h-24 rounded-lg")}
                    placeholder={`Ex.: Alternativa ${option}`}
                    {...register(
                      `option${option.toLowerCase()}` as keyof QuestionFormData
                    )}
                    disabled={isUploadMode}
                  />
                  {errors[
                    `option${option.toLowerCase()}` as keyof QuestionFormData
                  ] && (
                    <span className="text-red-500 text-sm">
                      {
                        errors[
                          `option${option.toLowerCase()}` as keyof QuestionFormData
                        ]?.message
                      }
                    </span>
                  )}
                </div>
              ))}

              <div className="flex flex-col space-y-1">
                <Label htmlFor="correctOption" className="tracking-tighter">
                  Alternativa Correta:
                </Label>
                <Select {...register("correctOption")}>
                  <SelectTrigger className="bg-white" disabled={isUploadMode}>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C", "D", "E"].map((option) => (
                      <SelectItem value={option} key={option}>
                        Alternativa {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.correctOption && (
                  <span className="text-red-500 text-sm">
                    {errors.correctOption.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isUploadMode}
              className="w-full h-12 mt-4"
            >
              {isUploadMode ? "Atualizar Questão" : "Enviar Questão"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
