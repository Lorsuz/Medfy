export interface College {
	id: number;
	name: string;
	acronym: string;
}

interface ApiError {
	message: string;
	status: number;
}

export const fetchCollege = async (): Promise<College[] | ApiError> => {
	try {
		const response = await fetch( "https://medfy.onrender.com/api/college", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		} );

		if ( !response.ok ) {
			return {
				message: `Erro ao buscar os locais: ${ response.statusText }`,
				status: response.status,
			};
		}

		const data = ( await response.json() ) as College[];
		return data;
	} catch ( error ) {
		return {
			message: error instanceof Error ? error.message : "Erro desconhecido",
			status: 500,
		};
	}
};
