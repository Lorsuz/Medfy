import crypto from 'crypto';

export default function generateStrongKey(): string {
	const lengthInBytes = 256 / 8;
	return crypto.randomBytes(lengthInBytes).toString('base64');
}
