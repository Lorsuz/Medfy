
import * as collegeController from '../controllers/college.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';

import {Router} from 'express'
const router = Router();

router.route( '/' )
	.get( collegeController.getAllColleges )
	.post( isAuthenticated, isAdmin, collegeController.createCollege )
	.delete( isAuthenticated, isAdmin, collegeController.deleteCollege )
	.put( isAuthenticated, isAdmin, collegeController.updateCollege );
export default router;