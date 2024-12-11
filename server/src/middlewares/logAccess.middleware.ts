import pool from '../config/conn.config';
import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
const logAccess = expressAsyncHandler( async ( req: Request & any, res: Response, next: NextFunction ) => {
	const ip = req.ip || req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
	const userAgent = req.headers[ 'user-agent' ];

	try {
		await pool.execute(
			`INSERT INTO accessLogs (ipAddress, userAgent) VALUES (?, ?)`,
			[ ip, userAgent ]
		);

		await pool.execute(
			`INSERT INTO appAccess (accessCount) 
					 VALUES (1)
					 ON DUPLICATE KEY UPDATE accessCount = accessCount + 1, lastAccessed = CURRENT_TIMESTAMP`
		);
	} catch ( error: any ) {
		console.error( 'Erro ao registrar acesso:', error.message );
	}

	next();
} );

export default logAccess;