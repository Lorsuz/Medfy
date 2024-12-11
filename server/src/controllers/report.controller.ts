import expressAsyncHandler from 'express-async-handler';
import { pool } from '../config/router.config.js';

export const getAllReports = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const [ rows ] = await pool.query( 'SELECT * FROM reports' );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const getReport = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'SELECT * FROM reports WHERE id = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const createReport = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { questionId, reportReason, reporterId } = req.body;
		const [ rows ] = await pool.query( 'INSERT INTO reports ( questionId, reporterId, reportReason  ) VALUES ( ?, ?, ? )', [ questionId, reporterId, reportReason ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const deleteReport = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'DELETE FROM reports WHERE id = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const updateReport = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;
		const { questionId, reportReason, reporterId } = req.body;
		const [ rows ] = await pool.query( 'UPDATE reports SET questionId = ?, reporterId = ?, reportReason = ? WHERE id = ?', [ questionId, reporterId, reportReason, id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const getReportsByUser = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'SELECT * FROM reports WHERE reporterId = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const getReportsByQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'SELECT * FROM reports WHERE questionId = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const getReportsByUserAndQuestion = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { reporterId, questionId } = req.params;
		const [ rows ] = await pool.query( 'SELECT * FROM reports WHERE reporterId = ? AND questionId = ?', [ reporterId, questionId ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );
