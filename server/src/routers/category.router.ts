
import * as categoryController from '../controllers/category.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import {Router} from 'express'
const router = Router();

router.route( '/' )
	.get(  categoryController.getAllCategories )
	// .post( isAuthenticated, isAdmin, categoryController.createCategory )
	// .delete( isAuthenticated, isAdmin, categoryController.deleteCategory )
	// .put( isAuthenticated, isAdmin, categoryController.updateCategory );
export default router;