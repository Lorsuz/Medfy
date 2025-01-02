import { cn } from "@drexdev/lib/utils";
import { QuestionOption } from "@drexdev/utils/types";
import { ScissorsLineDashed } from "lucide-react";

interface QuestionOptionsProps {
  options: QuestionOption[];
  onChange(option: string): void;
  selectedOption?: string;

  optionCorrect?: string;
}

export function QuestionOptions({
  options,
  onChange,
  selectedOption,
  optionCorrect,
}: QuestionOptionsProps) {
  const isRight = (option: string) => option == optionCorrect;
  const isSelected = (option: string) => option == selectedOption;

  /* Se for a opcao correta e nao for a opcao selecionada, mostrar icone de cortar, e texto tachado */
  const isNotRightAndNotSelected = (option: string) =>
    !isRight(option) && !isSelected(option);

  return (
    <div className="mt-6 ml-5 flex flex-col gap-2">
      {options.map((option, index) => (
        <div
          key={index}
          className="text-[13px] cursor-pointer relative"
          onClick={() => {
            if (!optionCorrect) onChange(option.option);
          }}
        >
          {optionCorrect && isNotRightAndNotSelected(option.option) && (
            <ScissorsLineDashed
              className="absolute left-[-25px] top-[3px] text-muted-foreground"
              strokeWidth={1.5}
            />
          )}

          <div className="grid grid-cols-[auto_1fr] items-start gap-3">
            <div
              className={cn(
                (optionCorrect && option.option == optionCorrect) ||
                  (!optionCorrect && selectedOption == option.option)
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#d9d9d9]",
                optionCorrect &&
                  selectedOption == option.option &&
                  selectedOption != optionCorrect &&
                  "bg-red-400 text-white",
                "w-6 h-6 font-medium rounded-full flex items-center justify-center mt-[2px]"
              )}
            >
              {String.fromCharCode(65 + index)}
            </div>

            <span
              className={cn(
                optionCorrect &&
                  isNotRightAndNotSelected(option.option) &&
                  "text-muted-foreground/60 line-through",
                "text-base"
              )}
            >
              {option.option.charAt(0).toUpperCase() + option.option.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
