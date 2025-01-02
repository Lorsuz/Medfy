import * as UserController from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import { loginRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { Router } from 'express';
const router = Router();

router.route( '/' )
	.get( isAuthenticated, isAdmin, UserController.getAllUsers )
	.delete( isAuthenticated, UserController.deleteUser );

router.post( '/import-all', UserController.importUsers );

router.post( '/register', UserController.register );
router.get( '/verify-token', UserController.verifyToken );
router.post( '/login', loginRateLimiter, UserController.login );
router.get( '/validate-token', isAuthenticated, UserController.validateJWT );
router.post( '/logout', isAuthenticated, UserController.logOut );

router.post( '/request-reset', UserController.requestPasswordReset );
router.post( '/reset-password', UserController.resetPassword );

router.patch( '/personal-info', isAuthenticated, UserController.UpdatePersonalInfo );
router.patch( '/academic-info', isAuthenticated, UserController.UpdateAcademicInfo );
router.patch( '/meet-by', isAuthenticated, UserController.UpdateMeetBy );
router.patch( '/change-password', isAuthenticated, UserController.changePassword );

// router.get( '/user-dashboard', isAuthenticated, UserController.logOut );
// router.get( '/admin-dashboard', isAuthenticated, UserController.logOut );
// router.get( '/admin-dashboard', isAuthenticated, UserController.logOut );

export default router;