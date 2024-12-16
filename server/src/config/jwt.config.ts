import jwt from 'jsonwebtoken';

import { secretKey } from './router.config.js';

export const generateToken = ( userId: number, isAdmin: boolean ): string => {
	const payload = { userId, isAdmin };
	const options = { expiresIn: '31d' };
	return jwt.sign( payload, secretKey );
};
