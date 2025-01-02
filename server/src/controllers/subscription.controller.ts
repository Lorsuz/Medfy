import expressAsyncHandler from 'express-async-handler';
import { pool, ApiError } from '../config/router.config.js';

// Obter todas as assinaturas
export const getSubscriptions = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const [ subscriptions ]: any = await pool.query(
			`SELECT s.id, s.userId, s.planId, s.startDate, s.endDate, p.name AS planName
       FROM subscriptions s
       INNER JOIN plans p ON s.planId = p.id`
		);
		if ( subscriptions.length === 0 ) throw new ApiError( 'Nenhuma assinatura encontrada', 404 );
		res.json( subscriptions );
	} catch ( error ) {
		next( error );
	}
} );

// Obter uma assinatura específica
export const getSubscription = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const [ subscription ]: any = await pool.query(
			`SELECT s.id, s.userId, s.planId, s.startDate, s.endDate, p.name AS planName
       FROM subscriptions s
       INNER JOIN plans p ON s.planId = p.id
       WHERE s.id = ?`,
			[ id ]
		);
		if ( subscription.length === 0 ) throw new ApiError( 'Assinatura não encontrada', 404 );
		res.json( subscription[ 0 ] );
	} catch ( error ) {
		next( error );
	}
} );

// Criar uma assinatura
export const createSubscription = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { userId, planId, startDate, endDate } = req.body;
		const [ result ]: any = await pool.query(
			'INSERT INTO subscriptions (userId, planId, startDate, endDate) VALUES (?, ?, ?, ?)',
			[ userId, planId, startDate, endDate ]
		);
		res.status( 201 ).json( { message: 'Assinatura criada', subscriptionId: result.insertId } );
	} catch ( error ) {
		next( error );
	}
} );

// Atualizar uma assinatura
export const updateSubscription = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const { planId, startDate, endDate } = req.body;
		await pool.query(
			'UPDATE subscriptions SET planId = ?, startDate = ?, endDate = ? WHERE id = ?',
			[ planId, startDate, endDate, id ]
		);
		res.json( { message: 'Assinatura atualizada' } );
	} catch ( error ) {
		next( error );
	}
} );

// Deletar uma assinatura
export const deleteSubscription = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		await pool.query( 'DELETE FROM subscriptions WHERE id = ?', [ id ] );
		res.json( { message: 'Assinatura deletada' } );
	} catch ( error ) {
		next( error );
	}
} );

export const cancelSubscription = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		await pool.query( 'UPDATE subscriptions SET endDate = NOW() WHERE id = ?', [ id ] );
		res.json( { message: 'Assinatura cancelada' } );
	} catch ( error ) {
		next( error );
	}
} );