export interface Category {
	id: number;
	name: string;
	parentId: number | null;
	children: Category[];
}

interface ApiError {
	message: string;
	status: number;
}

export const fetchCategories = async (): Promise<Category[] | ApiError> => {
	try {
		const response = await fetch( "https://medfy.onrender.com/api/category", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		if ( !response.ok ) {
			return {
				message: `Erro ao buscar as categorias: ${ response.statusText }`,
				status: response.status,
			};
		}

		const data = ( await response.json() ) as Category[];
		return data;
	} catch ( error ) {
		return {
			message: error instanceof Error ? error.message : "Erro desconhecido",
			status: 500,
		};
	}
};
