import { Request, Response } from '../config/router.config.js';
// import * as indexController from '../controllers/index.controller.js';
import { Router } from 'express';
const router = Router();

router.get( '/', ( req: Request, res: Response ) => {
	res.end( 'API is running here! go to /api/users/all to see the users' );
} );

// router.post( '/upload-pdf', upload.single( 'pdf' ), indexController.uploadPdf );

export default router;
