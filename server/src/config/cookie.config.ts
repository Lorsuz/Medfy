import { Response } from '../config/router.config.js';

export const setAuthCookie = ( res: Response, token: string ) => {
	res.cookie( 'authToken', token, {
		httpOnly: true, // Torna o cookie inacessível via JavaScript
		secure: process.env.NODE_ENV === process.env.PRODUCTION_KEY, // Apenas em HTTPS em produção
		sameSite: 'strict', // Previne ataques CSRF
		maxAge: 7 * 24 * 60 * 60 * 1000, // Expira em 7 dias
	} );
};