import { StarIcon } from "lucide-react";

export function QuestionFooter() {
  return (
    <div className="flex items-center justify-end mt-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <StarIcon size={16} />
        <span className="text-[13px] cursor-pointer">
          Marcar questão para revisão
        </span>
      </div>
    </div>
  );
}
