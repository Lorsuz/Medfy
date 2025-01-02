import { JSX } from "react";
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
import { Controller, useFormContext } from "react-hook-form";

interface QuestionCardSelectProps {
  label: string | JSX.Element;
  name: string;
  options: Option[];
}

interface Option {
  label: string;
  value: string;
}

export function QuestionCardSelect({
  label,
  name,
  options,
}: QuestionCardSelectProps) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col space-y-1 w-full">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectGroup>
                <SelectLabel>Escolha uma opção</SelectLabel>
                {options.map((option, index) => (
                  <SelectItem
                    key={`${option.value}-${index}`}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
