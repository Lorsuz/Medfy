import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import * as questionController from '../controllers/question.controller.js';
import multer from "multer";
const router = Router();

const upload = multer( { dest: 'uploads/PDFs' } );

router.route( '/' )
	.get( isAuthenticated, questionController.getQuestions )
	.post( isAuthenticated, isAdmin, questionController.createQuestion );

router.route( "/:id" ).get( isAuthenticated, questionController.getQuestion )
	.put( isAuthenticated, isAdmin, questionController.updateQuestion )
	.delete( isAuthenticated, isAdmin, questionController.deleteQuestion );

router.route( '/disable/:id' )
	.post( isAuthenticated, isAdmin, questionController.disableQuestion );

router.get( '/available', isAuthenticated, questionController.getAvailableQuestions );

router.post( '/import', upload.single( 'pdf' ), questionController.uploadPdfWithPy );

router.get( '/years', isAuthenticated, questionController.getYears );

export default router;