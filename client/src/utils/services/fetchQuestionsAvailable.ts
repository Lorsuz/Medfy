export interface QuestionRequest {
	year: string;
	college: string;
	category: string;
}

export interface QuestionOption {
	option: string;
	isRight: boolean;
}

export interface Question {
	questionId: number;
	question: string;
	justification: string;
	year: number;
	college_name: string;
	options: QuestionOption[];
	isRights: string;
	categoryId: number;
	category_history: string[];
}

interface ApiError {
	message: string;
	status: number;
}

export const fetchQuestionsAvailable = async ( {
	year,
	college,
	category,
}: QuestionRequest ): Promise<Question[] | ApiError> => {
	try {
		const response = await fetch( "https://medfy.onrender.com/api/question/get-available", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify( { year, college, category } ),
		} );

		if ( !response.ok ) {
			return {
				message: `Erro ao buscar as questões: ${ response.statusText }`,
				status: response.status,
			};
		}

		const data = ( await response.json() ) as Question[];
		return data;
	} catch ( error ) {
		return {
			message: error instanceof Error ? error.message : "Erro desconhecido",
			status: 500,
		};
	}
};
