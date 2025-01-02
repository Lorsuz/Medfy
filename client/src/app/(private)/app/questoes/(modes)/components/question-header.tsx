import { BiCaretRight } from "react-icons/bi";

interface QuestionHeaderProps {
  questionId: number;
  categoryHistory: string[];
  year: number;
  collegeName: string;
}

export function QuestionHeader({
  questionId,
  categoryHistory,
  year,
  collegeName,
}: QuestionHeaderProps) {
  return (
    <div>
      <div className="bg-[#f3f3f3] flex gap-4 items-center h-7 text-muted-foreground">
        <span className="bg-[#d9d9d9] h-full flex items-center px-4 text-sm font-semibold">
          ID: {questionId}
        </span>

        {categoryHistory.map((category, index) => (
          <span
            key={index}
            className="h-full flex gap-3 items-center text-sm font-medium"
          >
            {category}

            {index !== categoryHistory.length - 1 && <BiCaretRight size={16} />}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-[13px] mt-2">
        <span>
          <b>Ano:</b> {year}
        </span>
        <span>
          <b>Local:</b> {collegeName}
        </span>
      </div>
    </div>
  );
}
