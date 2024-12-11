import nodemailer from 'nodemailer';
import { nodemailerConfig } from '../config/nodemailer.config.js';

// Função auxiliar para enviar e-mails
const sendEmail = async (email: string, subject: string, text: string, html: string) => {
	try {
		const config = await nodemailerConfig();
		const transporter = nodemailer.createTransport(config);

		// Verifica se o servidor está pronto
		await transporter.verify().then(success => {
			if (success) {
				console.log('Server is ready to take our messages');
			}
		});

		const info: any = await transporter.sendMail({
			from: process.env.ADMIN_EMAIL,
			to: email,
			subject,
			text,
			html
		});

		console.log('E-mail enviado com sucesso');

		if (process.env.NODE_ENV === process.env.DEVELOPMENT_KEY) {
			console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
		}

		return nodemailer.getTestMessageUrl(info);
	} catch (error) {
		console.log(error);
	}
};

// Função para verificar o e-mail
export const verifyEmail = async (email: string, link: string) => {
	const subject = 'Verificação de Email';
	const text = `Clique no link para verificar seu email: ${link}`;
	const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					font-family: Arial, sans-serif;
					margin: 0;
					padding: 0;
					background-color: #f0f0f0;
				}
				.container {
					width: 80%;
					max-width: 500px;
					min-width: 300px;
					margin: auto;
					padding: 20px;
					background-color: #fff;
					border-radius: 5px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					text-align: center;
				}
				h1 {
					font-size: 2rem;
					margin-bottom: 20px;
					color: #008025;
				}
				p {
					font-size: 1.2rem;
					line-height: 1.5;
					margin-bottom: 20px;
				}
				.button {
					display: inline-block;
					background-color: #008025;
					color: #fff;
					padding: 10px 20px;
					border-radius: 5px;
					text-decoration: none;
					transition: background-color 0.3s;
					font-size: 1.1rem;
				}
				.button:hover {
					background-color: #058226;
				}
			</style>
			<title>Medfy</title>
		</head>
		<body>
			<div class="container">
				<h1>Medfy</h1>
				<p>Clique no botão a seguir para verificar seu email.</p>
				<a class="button" href="${link}">Confirmar Email</a>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, subject, text, html);
};

// Função para enviar e-mail de redefinição de senha
export const sendResetEmail = async (email: string, link: string) => {
	const subject = 'Redefinição de Senha';
	const text = `Clique no link para redefinir sua senha: ${link}`;
	const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					font-family: Arial, sans-serif;
					margin: 0;
					padding: 0;
					background-color: #f0f0f0;
				}
				.container {
					width: 80%;
					max-width: 500px;
					min-width: 300px;
					margin: auto;
					padding: 20px;
					background-color: #fff;
					border-radius: 5px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					text-align: center;
				}
				h1 {
					font-size: 2rem;
					margin-bottom: 20px;
					color: #008025;
				}
				p {
					font-size: 1.2rem;
					line-height: 1.5;
					margin-bottom: 20px;
				}
				.button {
					display: inline-block;
					background-color: #008025;
					color: #fff;
					padding: 10px 20px;
					border-radius: 5px;
					text-decoration: none;
					transition: background-color 0.3s;
					font-size: 1.1rem;
				}
				.button:hover {
					background-color: #058226;
				}
			</style>
			<title>Redefinição de Senha</title>
		</head>
		<body>
			<div class="container">
				<h1>Medfy</h1>
				<p>Clique no botão a seguir para redefinir sua senha.</p>
				<a class="button" href="${link}">Redefinir Senha</a>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, subject, text, html);
};
