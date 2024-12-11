import expressAsyncHandler from 'express-async-handler';
import { pool } from '../config/router.config.js';

export const getAllColleges = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const [ rows ] = await pool.query( 'SELECT * FROM colleges' );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const createCollege = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { name, acronym } = req.body;
		const [ rows ] = await pool.query( 'INSERT INTO colleges ( name, acronym ) VALUES ( ?, ? )', [ name, acronym ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const deleteCollege = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'DELETE FROM colleges WHERE id = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

export const updateCollege = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const { name, acronym } = req.body;
		const [ rows ] = await pool.query( 'UPDATE colleges SET name = ?, acronym = ? WHERE id = ?', [ name, acronym, id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} );

