import expressAsyncHandler from 'express-async-handler';
import { pool } from '../config/router.config.js';
import { number } from 'zod';

interface Category {
	id: number;
	categoryName: string;
	parentId: number;
	children?: Category[];
}

export const getAllCategories = expressAsyncHandler( async ( req, res, next ) => {
	console.log( req.ip || req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress );
	console.log( req.headers[ 'user-agent' ] );
	try {
		const [ rows ]: [ Category[] ] | any = await pool.query(
			'SELECT id, categoryName, parentId FROM categories'
		);
		console.log( rows );

		const buildTree = (
			categories: Category[],
			parentId: number | null
		): Category[] => {
			return categories
				.filter( ( category ) => category.parentId === parentId )
				.map( ( parent ) => ( {
					...parent,
					children: buildTree( categories, parent.id ),
				} ) );
		};

		let sortedCategories = buildTree( rows, null );

		const changePropertiesName = ( categories: Category[] ) => {
			return categories.map( ( category ) => {
				return {
					id: category.id,
					name: category.categoryName,
					parentId: category.parentId,
					children: category.children ? changePropertiesName( category.children ) : [],
				};
			} );
		};
		sortedCategories = changePropertiesName( sortedCategories );

		res.json( sortedCategories );
	} catch ( error ) {
		next( error );
	}
} );

/* export const createCategory = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { name, acronym } = req.body;
		const [ rows ] = await pool.query( 'INSERT INTO categories ( name, acronym ) VALUES ( ?, ? )', [ name, acronym ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} ); */

/* export const deleteCategory = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const [ rows ] = await pool.query( 'DELETE FROM categories WHERE id = ?', [ id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} ); */

/* export const updateCategory = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const { name, acronym } = req.body;
		const [ rows ] = await pool.query( 'UPDATE categories SET name = ?, acronym = ? WHERE id = ?', [ name, acronym, id ] );
		res.json( rows );
	} catch ( error ) {
		next( error );
	}
} ); */

