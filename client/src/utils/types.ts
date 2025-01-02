import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SideNavProps {}

export interface ILink {
  title: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export type SideNavLinkProps = ILink & {
  selected: boolean;
  select(): void;
};

export interface Question {
  questionId: number;
  question: string;
  justification: string;
  image?: string;
  year: number;
  collegeName: string;
  categoryName: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  option: string;
  isRight: boolean;
}

export interface AuthData {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}
