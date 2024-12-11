import nodemailer from 'nodemailer';

export async function nodemailerConfig() {
	let nodemailerConfig: any

	/* if (process.env.NODE_ENV === process.env.DEVELOPMENT_KEY) {
		const testAccount = await nodemailer.createTestAccount();
		nodemailerConfig = {
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: process.env.EMAIL_SECURE === 'true',
			auth: {
				user: testAccount.user,
				pass: testAccount.pass
			}
		}; */
	// }else if (process.env.NODE_ENV === process.env.PRODUCTION_KEY) {
		console.log(process.env.NODE_ENV);
		console.log(process.env.PRODUCTION_KEY);
		
		nodemailerConfig = {
			service: 'Gmail',
			auth: {
				user: process.env.ADMIN_EMAIL,
				pass: process.env.ADMIN_EMAIL_PASSWORD
			}
		};
	// }

	return nodemailerConfig;
}
