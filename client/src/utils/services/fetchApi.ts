const fetchApi = async (
  route: string,
  data?: {},
  method?: "GET" | "POST" | "PUT" | "DELETE"
) => {
  try {
    const response = await fetch(`http://localhost:3001/api${  /* process.env.API_BASE_URL || */ route }`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro ao criar usuário" + errorData);
      throw new Error(errorData.message || "Erro na requisição");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao criar usuário" + error);
    throw new Error(error instanceof Error ? error.message : "Erro inesperado");
  }
};

export default fetchApi;
