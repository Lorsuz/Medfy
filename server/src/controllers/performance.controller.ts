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
		const responseData = performance.map( ( p: any ) => [ userLogged, p.questionId, p.isCorrect ] );
		await pool.execute( 'INSERT INTO userResponses ( userId, questionId, isCorrect ) VALUES ?', [ responseData ] );

		res.status( 201 ).json( { message: "Desempenho registrado com sucesso" } );
	} catch ( error ) {
		next( error );
	}

} );
export const getPerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const userLogged = req.user.id;
		const [ performance ] = await pool.query( 'SELECT COUNT( isCorrect ) AS total, SUM( isCorrect ) AS correct FROM userResponses WHERE userId = ?', [ userLogged ] );
		const { total, correct } = performance[ 0 ];
		const incorrect = total - correct;
		const percentage = ( correct / total ) * 100;
		res.status( 200 ).json( { total, correct, incorrect, percentage } );
	} catch ( error ) {
		next( error );
	}
} );


export const updatePerformance = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const userLogged: number = req.user.id;
		const { responses }: { responses: { questionId: number, isCorrect: boolean; }[]; } = req.body;
		const performanceData = responses.map( ( p: any ) => [ userLogged, p.questionId, p.isCorrect ] );

		await pool.execute( 'INSERT INTO userResponses ( userId, questionId, isCorrect ) VALUES ?', [ performanceData ] );

		res.status( 201 ).json( { message: 'Desempenho registrado com sucesso' } );

	} catch ( error ) {
		next( error );
	}
} );