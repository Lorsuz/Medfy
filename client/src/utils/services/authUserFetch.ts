import { User } from "@/store/authStore";

export interface authenticateUserPostRequest {
	email: string;
	password: string;
}

interface ApiError {
	message: string;
	status: number;
}

export const authenticateUserFetch = async ( {
	email,
	password,
}: authenticateUserPostRequest ): Promise<User | ApiError> => {
	try {
		const response = await fetch( "https://medfy.onrender.com/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { email, password } ),
		} );

		if ( !response.ok ) {
			return {
				message: `Erro ao autenticar o usuário: ${ response.statusText }`,
				status: response.status,
			};
		}

		const data = ( await response.json() ) as User;
		return data;
	} catch ( error ) {
		return {
			message: error instanceof Error ? error.message : "Erro desconhecido",
			status: 500,
		};
	}
};
