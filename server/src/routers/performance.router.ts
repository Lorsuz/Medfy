import { Router } from 'express';
import * as performanceController from '../controllers/performance.controller.js';
import {  isAuthenticated } from '../middlewares/auth.middleware.js';
const router = Router();

router.route( '/' )
	.get( performanceController.getPerformance )
	.post( isAuthenticated, performanceController.updatePerformance );
export default router;