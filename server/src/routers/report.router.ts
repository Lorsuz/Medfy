import {Router} from 'express'
import * as reportController from '../controllers/report.controller.js';

const router = Router();

router.route('/')
	.get( reportController.getAllReports )
	.post( reportController.createReport )
	.delete( reportController.deleteReport )
	.put( reportController.updateReport );

router.route('/:id')
	.get( reportController.getReport );

router.route('/user/:id')
	.get( reportController.getReportsByUser );

export default router;