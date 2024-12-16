import { jwt, Request, Response, NextFunction, secretKey, pool, ApiError } from '../config/router.config.js';
import expressAsyncHandler from 'express-async-handler';

export const generateToken = ( id: number | string, isAdmin: boolean ): string => jwt.sign( { id, isAdmin }, secretKey, { expiresIn: '1d' } );

export const isAuthenticated = expressAsyncHandler( async ( req: Request & { user?: any; }, res: Response, next: NextFunction ) => {
	try {
		const token = req.headers.authorization?.split( ' ' )[ 1 ];

		if ( !token ) {
			throw new ApiError( 'Faça login para acessar esta página', 401 );
		}

		const decoded: any = jwt.verify( token, secretKey );

		if ( decoded.userId ) {
			// const [ users ]: any = await pool.query( 'SELECT * FROM users WHERE id = ?', [ decoded.id ] );
			// if ( users.length > 0 ) {
			// const user = users[ 0 ];
			// if ( user.verified === 0 ) {
			// throw new ApiError( 'Usuário não verificado', 401 );
			// }
			req.user = decoded;
			next();
			// } else {
			// 	throw new ApiError( 'Nenhum usuário encontrado com este token', 404 );
			// }
		} else {
			throw new ApiError( 'Nenhum ID encontrado no token decodificado', 404 );
		}
	} catch ( err ) {
		next( err );
	}
} );

export const isAdmin = ( req: Request & { user?: any; }, res: Response, next: NextFunction ) => {
	try {
		if ( req.user && req.user.isAdmin ) {
			next();
		} else {
			res.status( 403 ).json( { message: 'Acesso negado: você não é administrador.' } );
		}
	} catch ( err ) {
		next( err );
	}
};
