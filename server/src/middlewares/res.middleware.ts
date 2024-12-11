import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import ApiError from '../classes/ApiError.class.js';

export const errorHandler = ( err: any, req: Request, res: Response, next: NextFunction ) => {
	if ( err instanceof ZodError ) {
		const errorMessage = err.errors[ 0 ]?.message || 'Erro de validação';
		res.status( 400 ).json( { message: errorMessage } );
	}

	if ( err instanceof ApiError ) {
		const message = err.message || 'Erro de aplicação';
		console.error( ':_: ->', err );
		res.status( err.status || 500 ).json( {
			message,
			stack: process.env.NODE_ENV === 'production' ? null : err.stack,
		} );
	}else{
		console.error( ':_: ->', err );
		res.status( 500 ).json( {
			message: err.message || 'Erro interno do servidor',
			stack: process.env.NODE_ENV === 'production' ? null : err.stack,
		} );
	}
};

export const finallyHandler = ( req: Request, res: Response, next: NextFunction ) => {
	console.log( `===== Request for ${ req.path } finished! =====` );
	next(); // Certifica-se de passar o controle para o próximo middleware, se houver
};
