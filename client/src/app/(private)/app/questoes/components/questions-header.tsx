import { JSX } from "react";

interface QuestionsHeaderProps {
  title: JSX.Element;
  description: JSX.Element;
}
export function QuestionsHeader({ title, description }: QuestionsHeaderProps) {
  return (
    <header>
      <h1 className="text-lg sm:text-2xl font-bold tracking-tighter">{title}</h1>
      <p className="text-muted-foreground text-xs sm:text-sm max-w-96">{description}</p>
    </header>
  );
}
