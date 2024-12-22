import * as UserController from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import { loginRateLimiter } from '../middlewares/rateLimit.middleware.js';
import {Router} from 'express'
const router = Router();

router.route( '/' )
	.get( isAuthenticated, isAdmin, UserController.getAllUsers )
	.delete( isAuthenticated, UserController.deleteUser );

router.post( '/import-all', UserController.importUsers );

router.get( '/verify-token', UserController.verifyToken );

router.post( '/register', UserController.register );
router.post( '/login', loginRateLimiter, UserController.login );
router.get( '/validate-token', isAuthenticated, UserController.validateJWT );

router.post( '/request-reset', UserController.requestPasswordReset );
router.post( '/reset-password', UserController.resetPassword );

router.put( '/change-password', isAuthenticated, UserController.changePassword );

router.route('/personal-info').put( isAuthenticated, UserController.UpdatePersonalInfo )
router.route('/academic-info').put( isAuthenticated, UserController.UpdateAcademicInfo )
router.route('/meet-by').put( isAuthenticated, UserController.UpdateMeetBy )
 
router.post( '/logout', isAuthenticated, UserController.logOut );
// router.get( '/user-dashboard', isAuthenticated, UserController.logOut );
// router.get( '/admin-dashboard', isAuthenticated, UserController.logOut );

export default router;