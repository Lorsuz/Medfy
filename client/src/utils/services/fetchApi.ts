import { toast } from "react-toastify";

const fetchApi = async ( route: string, data?: {}, method?: "GET" | "POST" | "PUT" | "DELETE" ) => {
	try {
		const response = await fetch( process.env.NEXT_PUBLIC_API_URL + route, {
			method: method || "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: data ? JSON.stringify( data ) : undefined,
		} );

		if ( !response.ok ) {
			const errorData = await response.json();
			console.error( "Erro na requisição: " + errorData );
			toast.error(errorData.message || "Erro na requisição")
			return undefined;
		}
		const res = await response.json()
		return res;
	} catch ( error: any ) {
		console.error( "Erro inesperado: " + error );
		toast.error(error.message)
		return undefined;
	}
};

export default fetchApi;

/* import { toast } from "react-toastify";

interface FetchOptions {
  data?: Record<string, any>; // Permite dados opcionais no corpo da requisição
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>; // Permite adicionar cabeçalhos customizados
}

const fetchApi = async <T>(route: string, options?: FetchOptions): Promise<T | undefined> => {
  const { data, method = "GET", headers } = options || {};

  // Verifica se a URL base está configurada
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    console.error("URL base não configurada. Verifique o arquivo .env.");
    toast.error("Erro interno de configuração.");
    return undefined;
  }

  try {
    const response = await fetch(`${baseUrl}${route}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers, // Adiciona cabeçalhos customizados se fornecidos
      },
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
    });

    // Verifica se a resposta é bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || "Erro na requisição";
      console.error("Erro na requisição:", errorData);
      toast.error(errorMessage);
      return undefined;
    }

    // Retorna o JSON tipado
    return await response.json();
  } catch (error: any) {
    const errorMessage = error?.message || "Erro inesperado";
    console.error("Erro inesperado:", error);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Lança novamente o erro para controle externo
  }
};

export default fetchApi;
*/
