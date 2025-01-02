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
  const isRight = (option: string) => option === optionCorrect;
  const isSelected = (option: string) => option === selectedOption;

  const showCutIcon = (option: string) =>
    optionCorrect && !isRight(option) && !isSelected(option);

  const optionLetter = (index: number) => String.fromCharCode(65 + index);

  return (
    <div className="mt-6 ml-5 flex flex-col gap-2">
      {options.map((option, index) => {
        const isCorrect = isRight(option.option);
        const isChosen = isSelected(option.option);
        const isIncorrectChoice = optionCorrect && isChosen && !isCorrect;

        return (
          <div
            key={index}
            className="text-[13px] cursor-pointer relative"
            onClick={() => {
              if (!optionCorrect) onChange(option.option);
            }}
          >
            {showCutIcon(option.option) && (
              <ScissorsLineDashed
                className="absolute left-[-25px] top-[3px] text-muted-foreground"
                strokeWidth={1.5}
              />
            )}

            <div className="grid grid-cols-[auto_1fr] items-start gap-3">
              {/* Indicador da letra da opção */}
              <div
                className={cn(
                  "w-6 h-6 font-medium rounded-full flex items-center justify-center mt-[2px]",
                  isCorrect || (!optionCorrect && isChosen)
                    ? "bg-primary text-primary-foreground"
                    : "bg-[#d9d9d9]",
                  isIncorrectChoice && "bg-red-400 text-white"
                )}
              >
                {optionLetter(index)}
              </div>

              {/* Texto da opção */}
              <span
                className={cn(
                  "text-base",
                  optionCorrect &&
                    !isCorrect &&
                    !isChosen &&
                    "text-muted-foreground/60 line-through"
                )}
              >
                {option.option.charAt(0).toUpperCase() + option.option.slice(1)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
