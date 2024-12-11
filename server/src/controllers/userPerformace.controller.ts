import ApiError from '../classes/ApiError.class';
import pool from '../config/conn.config';
import expressAsyncHandler from 'express-async-handler';

export const getTotalPerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	const userId = req.user.id; // ID do usuário autenticado
	try {
		const [ result ] = await pool.execute(
			`SELECT SUM(questionsAnswered) AS total_answered,
              SUM(questionsCorrect) AS total_correct,
              SUM(questions_wrong) AS total_wrong
       FROM userPerformance
       WHERE userId = ?`,
			[ userId ]
		);
		res.json( result[ 0 ] );
	} catch ( error ) {
		next( error );
	}
} );

// Por categoria
export const getPerformanceByCategory = expressAsyncHandler( async ( req: any, res, next ) => {
	const userId = req.user.id;
	try {
		const [ result ] = await pool.execute(
			`SELECT c.categoryName,
              up.questionsAnswered,
              up.questionsCorrect,
              up.questions_wrong
       FROM userPerformance up
       INNER JOIN categories c ON up.categoryId = c._id
       WHERE up.userId = ?
       ORDER BY up.questionsAnswered DESC`,
			[ userId ]
		);
		res.json( result );
	} catch ( error ) {
		next( error );
	}
} );

// Semanal ou Mensal
export const getPerformanceByPeriod = expressAsyncHandler( async ( req: any, res, next ) => {
	const userId = req.user.id;
	const { period } = req.query; // 'weekly' ou 'monthly'
	let dateCondition = '';

	if ( period === 'weekly' ) {
		dateCondition = 'YEARWEEK(performance_date, 1) = YEARWEEK(CURDATE(), 1)';
	} else if ( period === 'monthly' ) {
		dateCondition = 'MONTH(performance_date) = MONTH(CURDATE()) AND YEAR(performance_date) = YEAR(CURDATE())';
	} else {
		throw new ApiError( 'Invalid period. Use "weekly" or "monthly".', 400 );
	}

	try {
		const [ result ] = await pool.execute(
			`SELECT SUM(questionsAnswered) AS total_answered,
              SUM(questionsCorrect) AS total_correct,
              SUM(questions_wrong) AS total_wrong
       FROM userPerformance
       WHERE userId = ? AND ${ dateCondition }`,
			[ userId ]
		);
		res.json( result[ 0 ] );
	} catch ( error ) {
		next( error );
	}
} );