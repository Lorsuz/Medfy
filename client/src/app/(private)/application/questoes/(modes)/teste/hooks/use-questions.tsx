import { questionsService } from "@drexdev/services/questionsService";
import { Question } from "@drexdev/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[] | undefined>(undefined);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>(
    questions!
  );

  const searchParams = useSearchParams();

  const local = searchParams.get("local");
  const ano = searchParams.get("ano");
  const quantidade = searchParams.get("quantidade");

  async function fetchQuestions() {
    const fetchedQuestions = await questionsService.generateQuestions({
      year: Number(ano),
      collegeName: local,
      size:
        quantidade && parseInt(quantidade) >= 10 ? parseInt(quantidade) : 1,
    });

    setQuestions(fetchedQuestions);
  }
  
  useEffect(() => {
    fetchQuestions();
  }, [local, ano, quantidade]);

  useEffect(() => {
    if (questions) {
      setRemainingQuestions(questions);
    }
  }, [questions]);

  return {  };
}
