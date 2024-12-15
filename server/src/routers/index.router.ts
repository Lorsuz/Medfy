import { Request, Response, multer, exec, pool } from '../config/router.config.js';
// import * as indexController from '../controllers/index.controller.js';
import expressAsyncHandler from 'express-async-handler';
import ApiError from '../classes/ApiError.class.js';
import { Router } from 'express';
const router = Router();

const upload = multer( { dest: 'uploads/PDFs' } );

router.get( '/', ( req: Request, res: Response ) => {
	res.end( 'API is running here! go to /api/users/all to see the users' );
} );

// router.post( '/upload-pdf', upload.single( 'pdf' ), indexController.uploadPdf );

export const uploadPdfWithPy = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const filePath = req.file.path || '';

		exec( `python ../script/api_GPT_code_transfer.py ${ filePath }`, ( error, stdout, stderr ) => {
			if ( error ) {
				console.error( `Erro: ${ error.message }` );
				throw new ApiError( "Erro ao processar o PDF", 500 );

			}
			if ( stderr ) {
				console.error( `stderr: ${ stderr }` );
				throw new ApiError( "Erro no processamento", 500 );
			}
			console.log( `stdout: ${ stdout }` );
			return res.json( { message: 'PDF processado com sucesso' } );
		} );
	} catch ( error ) {
		next( error );
	}
} );

router.post( '/upload-pdf-py', upload.single( 'pdf' ), uploadPdfWithPy );

export default router;
