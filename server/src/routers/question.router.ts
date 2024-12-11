import { Router} from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import * as questionController from '../controllers/question.controller.js';
const router = Router();

router.route( '/' )
	.get( isAuthenticated, questionController.getQuestions )
	.post( isAuthenticated, isAdmin, questionController.createQuestion );

router.route('/inative-question')
	.post( isAuthenticated, isAdmin, questionController.inativeQuestion );

router.get('/get-available', isAuthenticated, questionController.getAvailableQuestions );
router.get('/get-one', isAuthenticated, questionController.getQuestion );

export default router;