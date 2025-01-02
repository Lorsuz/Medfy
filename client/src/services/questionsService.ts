import { api } from "@drexdev/utils/api";
import { Question } from "@drexdev/utils/types";
import { getCookie } from "cookies-next";

interface FilterQuestions {
  year?: number | null;
  collegeName?: string | null;
  size?: number;
  category?: string | null;
}

interface ResponseApi {
  total: number;
  page: number;
  limit: number;
  questions: Question[];
}

async function generateQuestions({
  year,
  category,
  collegeName,
  size = 10,
}: FilterQuestions) {
  const token = getCookie("@medfy:token");

  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const { data } = await api.get<ResponseApi>("question", {
      params: { limit: 98 },
      headers: { Authorization: `Bearer ${token}` },
    });

    // Filtra as questões com base nos critérios fornecidos
    const filteredQuestions = data.questions.filter((question) => {
      const matchesYear = year ? question.year === year : true;
      const matchesCollegeName = collegeName
        ? question.collegeName.toLowerCase() === collegeName.toLowerCase()
        : true;
      const matchesCategory = category
        ? question.categoryName.toLowerCase() === category.toLowerCase()
        : true;
        
      return matchesYear && matchesCollegeName && matchesCategory;
    });

    // Embaralha as questões filtradas de forma aleatória
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);

    // Retorna as questões aleatórias limitadas ao tamanho especificado
    return shuffled.slice(0, size);
  } catch (error) {
    console.error("Erro ao gerar as questões:", error);
    throw new Error("Falha ao gerar questões");
  }
}

export const questionsService = {
  generateQuestions,
};
