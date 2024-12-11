import expressAsyncHandler from "express-async-handler";
import { pool, ApiError } from '../config/router.config.js';

/* 
CREATE TABLE IF NOT EXISTS questions (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	categoryId INTEGER,
	collegeId INTEGER,
	question TEXT NOT NULL,
	justification TEXT NOT NULL,
	`year` YEAR NOT NULL,
	cancelled TINYINT(1) NOT NULL DEFAULT 0,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE
	SET NULL,
		FOREIGN KEY (collegeId) REFERENCES colleges(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de opções
CREATE TABLE IF NOT EXISTS options (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	questionId INTEGER NOT NULL,
	optionText TEXT NOT NULL,
	isRight BOOLEAN NOT NULL DEFAULT FALSE,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
-- Tabela de desempenho
CREATE TABLE IF NOT EXISTS userPerformance (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	categoryId INTEGER,
	questionsAnswered INTEGER DEFAULT 0,
	questionsCorrect INTEGER DEFAULT 0,
	lastActivity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE
	SET NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE TABLE IF NOT EXISTS userResponses (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
	userId INTEGER NOT NULL,
	questionId INTEGER NOT NULL,
	answeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	isCorrect BOOLEAN NOT NULL,
	FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (questionId) REFERENCES questions(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;
*/
export const registerPerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	// aqui recebe uma array de objetos com o desempenho do usuário logado [{questionId: number, isCorrect: boolean}], atualizando os dados da tabela userPerformance e userResponses
	try {
		const userLogged = req.user.id;
		const { performance } = req.body;
		const performanceData = performance.map( ( p: any ) => [ userLogged, p.categoryId, p.questionsAnswered, p.questionsCorrect ] );

		await pool.query( 'INSERT INTO userPerformance ( userId, categoryId, questionsAnswered, questionsCorrect) VALUES ?', [ performanceData ] );
		// atualizar a tabela userResponses
		const responseData = performance.map( ( p: any ) => [ userLogged, p.questionId, p.isCorrect ] );
		await pool.query( 'INSERT INTO userResponses ( userId, questionId, isCorrect ) VALUES ?', [ responseData ] );

		res.status( 201 ).json( { message: "Desempenho registrado com sucesso" } );
	} catch ( error ) {
		next( error );
	}

} );
export const getPerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const userLogged = req.user.id;
		const [ rows ] = await pool.query( 'SELECT * FROM userPerformance WHERE userId = ?', [ userLogged ] );
		if ( !rows ) throw new ApiError( "Nenhum dado de performance de usuário encontrado", 404 );

		res.status( 200 ).json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const getPerformanceByCategory = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const userLogged = req.user.id;
		const { categoryId } = req.body;
		const [ rows ] = await pool.query( 'SELECT * FROM userPerformance WHERE userId = ? AND categoryId = ?', [ userLogged, categoryId ] );
		if ( !rows ) throw new ApiError( "Nenhum dado de performance de usuário encontrado", 404 );

		res.status( 200 ).json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const updatePerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		// o body vai mandar uma lista de objetos com o desempenho do usuário logado [{questionId: number, isCorrect: boolean}], atualizando os dados da tabela userPerformance e userResponses
		const userLogged: number = req.user.id;
		const { responses }: { responses: { questionId: number, isCorrect: boolean; }[]; } = req.body;
		const performanceData = responses.map( ( p: any ) => [ userLogged, p.questionId, p.isCorrect ] );

		// Atualizar a tabela userResponses
		await pool.query( 'INSERT INTO userResponses ( userId, questionId, isCorrect ) VALUES ?', [ performanceData ] );

		// Atualizar a tabela userPerformance
		const correctAnswers = responses.filter( ( r ) => r.isCorrect ).length;
		const totalAnswers = responses.length;
		await pool.query( 'INSERT INTO userPerformance ( userId, questionsAnswered, questionsCorrect) VALUES ( ?, ?, ? )', [ userLogged, totalAnswers, correctAnswers ] );

		res.status( 201 ).json( { message: 'Desempenho registrado com sucesso' } );

	} catch ( error ) {
		next( error );
	}
} );