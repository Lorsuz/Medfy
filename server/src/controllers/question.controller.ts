import expressAsyncHandler from 'express-async-handler';
import { pool, ApiError } from '../config/router.config.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage( {
	destination: ( req, file, cb ) => {
		cb( null, 'uploads/images' );
	},
	filename: ( req, file, cb ) => {
		const ext = path.extname( file.originalname );
		cb( null, Date.now() + ext );
	}
} );

const upload = multer( { storage: storage } ).single( 'image' );

export const getQuestions = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const offset = ( page - 1 ) * limit;

		// Passo 1: Obter todas as questões com dados relacionados
		const [ questions ]: any = await pool.query(
			`SELECT 
							q.id AS questionId,
							q.question,
							q.justification,
							q.year,
							q.cancelled,
							col.name AS collegeName,
							cat.categoryName,
							GROUP_CONCAT(o.optionText ORDER BY o.id SEPARATOR '|') AS options,
							GROUP_CONCAT(o.isRight ORDER BY o.id SEPARATOR '|') AS isRights
					FROM questions q
					INNER JOIN colleges col ON q.collegeId = col.id
					INNER JOIN categories cat ON q.categoryId = cat.id
					LEFT JOIN options o ON o.questionId = q.id
					WHERE q.cancelled = 0
					GROUP BY q.id
					LIMIT ? OFFSET ?`,
			[ parseInt( limit ), offset ]
		);

		// Passo 2: Contar o número total de questões
		const [ [ count ] ]: any = await pool.query(
			`SELECT COUNT(*) AS total FROM questions WHERE cancelled = 0`
		);

		if ( questions.length === 0 ) {
			throw new ApiError( 'Nenhuma questão encontrada', 404 );
		}

		// Passo 3: Formatar a resposta com dados das questões e a paginação
		const formattedQuestions = questions.map( ( q: any ) => ( {
			questionId: q.questionId,
			question: q.question,
			imageUrl: q.imageUrl,
			justification: q.justification,
			year: q.year,
			collegeName: q.collegeName,
			categoryName: q.categoryName,
			options: q.options.split( '|' ).map( ( opt: string, index: number ) => ( {
				option: opt,
				isRight: q.isRights.split( '|' )[ index ] === '1',
			} ) ),
		} ) );

		// Retornar os dados paginados
		res.json( {
			total: count.total,
			page: parseInt( page ),
			limit: parseInt( limit ),
			questions: formattedQuestions,
		} );
	} catch ( error ) {
		next( error );
	}
} );

export const getQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;

		// Passo 1: Obter a questão com dados relacionados
		const [ questions ]: any = await pool.query(
			`SELECT 
							q.id AS questionId,
							q.question,
							q.imageUrl,
							q.justification,
							q.year,
							q.cancelled,
							col.name AS collegeName,
							cat.categoryName,
							GROUP_CONCAT(o.optionText ORDER BY o.id SEPARATOR '|') AS options,
							GROUP_CONCAT(o.isRight ORDER BY o.id SEPARATOR '|') AS isRights
					FROM questions q
					INNER JOIN colleges col ON q.collegeId = col.id
					INNER JOIN categories cat ON q.categoryId = cat.id
					LEFT JOIN options o ON o.questionId = q.id
					WHERE q.id = ? AND q.cancelled = 0
					GROUP BY q.id`,
			[ id ]
		);

		if ( questions.length === 0 ) {
			throw new ApiError( 'Questão não encontrada', 404 );
		}

		// Passo 2: Formatar a resposta
		const question = questions[ 0 ];
		const formattedQuestion = {
			questionId: question.questionId,
			question: question.question,
			imageUrl: question.imageUrl,
			justification: question.justification,
			year: question.year,
			collegeName: question.collegeName,
			categoryName: question.categoryName,
			options: question.options.split( '|' ).map( ( opt: string, index: number ) => ( {
				option: opt,
				isRight: question.isRights.split( '|' )[ index ] === '1',
			} ) ),
		};

		// Retornar a questão formatada
		res.json( formattedQuestion );
	} catch ( error ) {
		next( error );
	}
} );

export const createQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		upload( req, res, async ( err: any ) => {
			if ( err ) {
				return next( new ApiError( 'Erro no upload da imagem', 400 ) );
			}

			const { categoryId, collegeId, question, justification, year, options, optionRight } = req.body;

			// URL da imagem (ou caminho local se for o caso)
			let imageUrl: any = null;
			if ( req.file ) {
				imageUrl = `/uploads/${ req.file.filename }`;
			}

			// Inserir a questão no banco de dados
			const [ rows ]: any = await pool.query(
				'INSERT INTO questions (categoryId, collegeId, question, justification, year, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
				[ categoryId, collegeId, question, justification, year, imageUrl ]
			);

			const questionId = rows.insertId;

			// Inserir as opções de resposta
			const optionsData = options.map( ( option: any, index: number ) => [
				questionId,
				option,
				optionRight == index
			] );
			await pool.query( 'INSERT INTO options (questionId, optionText, isRight) VALUES ?', [ optionsData ] );

			res.json( { message: 'Question created', questionId } );
		} );
	} catch ( error ) {
		next( error );
	}
} );

export const updateQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		upload( req, res, async ( err: any ) => {
			if ( err ) {
				return next( new ApiError( 'Erro no upload da imagem', 400 ) );
			}

			const { questionId, categoryId, collegeId, question, justification, year, options, optionRight } = req.body;

			// URL da imagem (ou caminho local se for o caso)
			let imageUrl: any = null;
			if ( req.file ) {
				imageUrl = `/uploads/${ req.file.filename }`;
			}

			// Atualizar a questão no banco de dados
			await pool.query(
				'UPDATE questions SET categoryId = ?, collegeId = ?, question = ?, justification = ?, year = ?, imageUrl = ? WHERE id = ?',
				[ categoryId, collegeId, question, justification, year, imageUrl, questionId ]
			);

			// Atualizar as opções de resposta
			await pool.query( 'DELETE FROM options WHERE questionId = ?', [ questionId ] );
			const optionsData = options.map( ( option: any, index: number ) => [
				questionId,
				option,
				optionRight == index
			] );
			await pool.query( 'INSERT INTO options (questionId, optionText, isRight) VALUES ?', [ optionsData ] );

			res.json( { message: 'Question updated' } );
		} );
	} catch ( error ) {
		next( error );
	}
} );

export const deleteQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.body;
		await pool.query( 'DELETE FROM questions WHERE id = ?', [ id ] );
		res.json( { message: 'Question deleted' } );
	} catch ( error ) {
		next( error );
	}
} );


export const getAvailableQuestions = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { year, college, category, total } = req.body;
		const userId = req.user.id;

		// Validar parâmetros
		if ( !year || !college || !category ) {
			throw new ApiError( 'Parâmetros inválidos', 400 );
		}

		// Passo 1: Obter categorias descendentes
		const [ categories ]: any = await pool.query(
			`WITH RECURSIVE category_tree AS (
							SELECT id, categoryName, parentId
							FROM categories
							WHERE id = ?
							UNION ALL
							SELECT c.id, c.categoryName, c.parentId
							FROM categories c
							INNER JOIN category_tree ct ON c.parentId = ct.id
					)
					SELECT id FROM category_tree`,
			[ category ]
		);

		const categoryIds = categories.map( ( cat: any ) => cat.id );

		// Passo 2: Buscar questões disponíveis
		const [ questions ]: any = await pool.query(
			`SELECT 
							q.id AS questionId,
							q.question,
							q.imageUrl,
							q.justification,
							q.year,
							col.name AS collegeName,
							GROUP_CONCAT(o.optionText ORDER BY o.id SEPARATOR '|') AS options,
							GROUP_CONCAT(o.isRight ORDER BY o.id SEPARATOR '|') AS isRights,
							q.categoryId
					FROM questions q
					INNER JOIN colleges col ON q.collegeId = col.id
					INNER JOIN options o ON o.questionId = q.id
					WHERE q.categoryId IN (?) 
						AND q.year = ? 
						AND q.collegeId = ?
						AND q.id NOT IN (
								SELECT questionId 
								FROM userResponses 
								WHERE userId = ?
						)
					GROUP BY q.id
					LIMIT ?`,
			[ categoryIds, year, college, userId, parseInt( total ) || 10 ]
		);

		if ( questions.length === 0 ) {
			throw new ApiError( 'Nenhuma questão disponível', 404 );
		}

		// Passo 3: Construir histórico de categorias
		const questionDetails = await Promise.all(
			questions.map( async ( q: any ) => {
				const [ categoryHistory ]: any = await pool.query(
					`WITH RECURSIVE categoryPath AS (
											SELECT id, categoryName, parentId
											FROM categories
											WHERE id = ?
											UNION ALL
											SELECT c.id, c.categoryName, c.parentId
											FROM categories c
											INNER JOIN categoryPath cp ON c.id = cp.parentId
									)
									SELECT categoryName FROM categoryPath ORDER BY id`,
					[ q.categoryId ]
				);

				// Transformar opções concatenadas em arrays
				const options = q.options.split( '|' );
				const isRights = q.isRights.split( '|' ).map( ( val: string ) => val === '1' );

				return {
					...q,
					categoryHistory: categoryHistory.map( ( cat: any ) => cat.categoryName ),
					options: options.map( ( opt: string, index: number ) => ( {
						option: opt,
						isRight: isRights[ index ],
					} ) ),
				};
			} )
		);

		// Retornar questões com detalhes
		/* 
		{
			questionId: number,
			question: string,
			imageUrl: string,
			justification: string,
			year: number,
			collegeName: string,
			options: [
				{
					option: string,
					isRight: boolean
				}
			],
			categoryHistory: string[]
		}
		*/
		res.json( questionDetails );
	} catch ( error ) {
		next( error );
	}
} );

export const inativeQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { questionId } = req.body;
		await pool.query( 'UPDATE questions SET cancelled = 1 WHERE id = ?', [ questionId ] );
		res.json( { message: 'Questão inativada' } );
	} catch ( error ) {
		next( error );
	}
} );

export const getYears = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const [ rows ]: any = await pool.execute( 'SELECT DISTINCT year FROM questions' );
		if ( !rows ) {
			throw new ApiError( 'Nenhum ano encontrado', 404 );
		}
		else {
			res.status( 200 ).json( rows );
		}
	} catch ( error ) {
		next( error );
	}
} );