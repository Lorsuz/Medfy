import expressAsyncHandler from 'express-async-handler';
import { pool, path, ApiError } from '../config/router.config.js';
import fs from 'fs';
import axios from 'axios';
import pdfParse from 'pdf-parse';
// import { any } from 'zod';

// Enviar dados ao GPT
async function sendToGpt ( messages: { role: string, content: string; }[] ) {
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-4',
				messages,
				temperature: 0,
			},
			{ headers: { Authorization: `Bearer ${ process.env.GPT_API_KEY }` } }
		);
		return response.data.choices[ 0 ].message.content;
	} catch ( err: any ) {
		console.error( 'Erro ao comunicar com o GPT:', err.message );
		throw new ApiError( 'Falha ao obter resposta do GPT' );
	}
}

// Processar PDF
async function processPdf ( filePath: string ) {
	const results = {
		totalQuestions: 0,
		addedQuestions: 0,
		skippedQuestions: 0,
		errors: [],
	} as {
		totalQuestions: number,
		addedQuestions: number,
		skippedQuestions: number,
		errors: {
			question: string,
			error: string;
		}[];
	};

	try {

		const pdfData = fs.readFileSync( filePath );
		const pdfPath = './uploads/sample.pdf';
		let text: any = fs.readFile( pdfPath, ( err, buffer ) => {
			if ( err ) {
				console.error( 'Erro ao ler o arquivo PDF:', err );
				return;
			}

			pdfParse( buffer )
				.then( data => {
					return data.text ? data.text : '';
				} )
				.catch( err => {
					console.error( 'Erro ao processar o PDF:', err );
				} );
		} );

		const questions = text.match( /\d+\)\s(.*?)(?=\d+\)\s|$)/g/* s */ ) || [];
		const gabarito = text.match( /\d+\s([A-E!])/g ) || [];
		if ( questions.length !== gabarito.length ) {
			throw new Error( 'Número de questões não corresponde ao gabarito' );
		}

		results.totalQuestions = questions.length;

		for ( let i = 0; i < questions.length; i++ ) {
			const questionText = questions[ i ].replace( /\n/g, ' ' ).trim();
			const correctOption = gabarito[ i ][ gabarito[ i ].length - 1 ];

			if ( correctOption === '!' ) {
				results.skippedQuestions++;
				continue;
			}

			const [ existingQuestion ]: any = await pool.execute(
				'SELECT * FROM questions WHERE question = ?',
				[ questionText ]
			);


			if ( existingQuestion.length > 0 ) {
				results.skippedQuestions++;
				continue;
			}

			const messages = [
				{ role: 'system', content: 'Você é um assistente de análise de questões.' },
				{
					role: 'user',
					content: `Analise a questão: ${ questionText }.\nResposta correta: Letra ${ correctOption }.\nRetorne um JSON com "Categoria" e "Justificativa".`,
				},
			];

			const gptResponse = await sendToGpt( messages );
			const parsedResponse = JSON.parse( gptResponse );

			if ( !parsedResponse.Categoria || !parsedResponse.Justificativa ) {
				results.errors.push( {
					question: questionText,
					error: 'Faltando categoria ou justificativa.',
				} );
				continue;
			}

			const [ insertResult ]: any = await pool.execute(
				'INSERT INTO questions (question, categoryId, justification) VALUES (?, ?, ?)',
				[ questionText, parsedResponse.Categoria, parsedResponse.Justificativa ]
			);

			const questionId = insertResult.insertId;
			const options = questionText.match( /[A-E]\)\s(.*?)(?=\s[A-E]\)|$)/g ) || [];
			for ( let j = 0; j < options.length; j++ ) {
				const optionText = options[ j ].replace( /[A-E]\)\s/, '' ).trim();
				const isRight = j === correctOption.charCodeAt( 0 ) - 65;

				await pool.execute(
					'INSERT INTO options (questionId, optionText, isRight) VALUES (?, ?, ?)',
					[ questionId, optionText, isRight ]
				);
			}

			results.addedQuestions++;
		}

	} catch ( err: any ) {
		throw new Error( "Erro ao processar PDF", err.message );
	}

	return results;
}


export const uploadPdf = expressAsyncHandler( async ( req: any, res, next ) => {

	try {
		const filePath = path.join( __dirname, req.file.path );

		const results = await processPdf( filePath );
		fs.unlinkSync( filePath );

		res.status( 200 ).json( {
			message: 'Processamento concluído',
			results,
		} );
	} catch ( error ) {
		next( error );
	}
} );
