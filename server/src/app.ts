import createError from 'http-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/res.middleware.js';
import logAccess from './middlewares/logAccess.middleware.js';
import session from 'express-session';
import { secretKey } from "./config/router.config.js";

dotenv.config();

import indexRouter from './routers/index.router.js';
import userRouter from './routers/user.router.js';
import categoryRouter from './routers/category.router.js';
import collegeRouter from './routers/college.router.js';
import planRouter from './routers/plan.router.js';
import subscriptionRouter from './routers/subscription.router.js';
import questionRouter from './routers/question.router.js';

const app: Application = express();

console.log( `APP_URL: ${ process.env.APP_URL }` );

app.use( bodyParser.json() );
app.use( cookieParser() );
app.use( cors(
	{
		origin: process.env.APP_URL, // Domínio do frontend
		credentials: true,              // Permite envio de cookies ou autenticação
	}
) );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( logger( 'dev' ) );

app.use( bodyParser.urlencoded( { extended: false } ) );

app.use(
	session( {
		secret: secretKey,
		resave: false,
		saveUninitialized: true
	} )
);


// app.use( logAccess);

app.get( '/', ( _, res, next ) => {
	try {
		res.end( 'API is running here!' );
	} catch ( error ) {
		next( error );
	}
}
);

app.use( '/api', indexRouter );
app.use( '/api/user', userRouter );
app.use( '/api/category', categoryRouter ); 
app.use( '/api/college', collegeRouter );
app.use( '/api/question', questionRouter );
app.use( '/api/subscription', subscriptionRouter );
app.use( '/api/plan', planRouter );

app.use( errorHandler );

app.use( ( req: Request, res: Response, next: NextFunction ) => {
	next( createError( 404 ) );
} );

app.use( ( err: { message: string; status: number; }, req: Request, res: Response ) => {
	res.locals.message = err.message;

	res.locals.error = req.app.get( 'env' ) === 'development' ? err : {};

	res.status( err.status || 500 );
	res.render( 'error' );
} );

export default app;