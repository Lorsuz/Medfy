import { JSX } from "react";

interface CardHeaderProps {
  title: JSX.Element;
  description: JSX.Element;
}

export function QuestionCardHeader({ title, description }: CardHeaderProps) {
  return (
    <header className="text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </header>
  );
}
