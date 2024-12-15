import nodemailer from 'nodemailer';
import { nodemailerConfig } from '../config/nodemailer.config.js';

// Função auxiliar para enviar e-mails
const sendEmail = async ( email: string, subject: string, text: string, html: string ) => {
	try {
		const config = await nodemailerConfig();
		const transporter = nodemailer.createTransport( config );

		// Verifica se o servidor está pronto
		await transporter.verify().then( success => {
			if ( success ) {
				console.log( 'Server is ready to take our messages' );
			}
		} );

		const info: any = await transporter.sendMail( {
			from: process.env.ADMIN_EMAIL,
			to: email,
			subject,
			text,
			html
		} );

		console.log( 'E-mail enviado com sucesso' );

		if ( process.env.NODE_ENV === process.env.DEVELOPMENT_KEY ) {
			console.log( `Send email: ${ nodemailer.getTestMessageUrl( info ) }` );
		}

		return nodemailer.getTestMessageUrl( info );
	} catch ( error ) {
		console.log( error );
	}
};

// Função para verificar o e-mail
export const verifyEmail = async ( email: string, link: string ) => {
	const subject = 'Verificação de Email';
	const text = `Clique no link para verificar seu email: ${ link }`;
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
            background-color: #e0e0e0; /* Cor de fundo mais clara para contraste */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
        }

        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            text-align: center;
            transition: box-shadow 0.3s;
						border: 3px solid #ccc;
        }

        .container:hover {
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Sombra mais profunda para destaque */
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #5a21cc; /* Cor azul escolhida */
        }

        p {
            font-size: 1.2rem;
            line-height: 1.5;
            margin-bottom: 30px;
            color: #333; /* Cor de texto mais escura para contraste */
        }

        .button {
            display: inline-block;
            background-color: #5a21cc;
            color: #fff;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.2s;
            font-size: 1.2rem;
            border: none;
            outline: none;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .button:hover {
            background-color: #5a21cc; /* Azul mais escuro para o hover */
            transform: scale(1.05); /* Pequeno efeito de zoom */
        }

        footer {
            margin-top: 30px;
            font-size: 0.9rem;
            color: #777;
        }
    </style>
    <title>Medfy</title>
</head>
<body>
    <div class="container">
        <h1>Medfy</h1>
        <p>Clique no botão a seguir para verificar seu email. Certifique-se de que o link abaixo não tenha expirado.</p>
        <a class="button" href="${ link }">Confirmar Email</a>
        <footer>
            <p>&copy; 2024 Medfy. Todos os direitos reservados.</p>
        </footer>
    </div>
</body>
</html>

	`;

	return sendEmail( email, subject, text, html );
};

// Função para enviar e-mail de redefinição de senha
export const sendResetEmail = async ( email: string, link: string ) => {
	const subject = 'Redefinição de Senha';
	const text = `Clique no link para redefinir sua senha: ${ link }`;
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
            background-color: #e0e0e0; /* Cor de fundo mais clara para contraste */
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            padding: 20px;
        }

        .container {
            width: 90%;
            max-width: 600px;
            margin: auto;
            padding: 30px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            text-align: center;
            transition: box-shadow 0.3s;
						border: 3px solid #ccc;
        }

        .container:hover {
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* Sombra mais profunda para destaque */
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #5a21cc;
        }

        p {
            font-size: 1.2rem;
            line-height: 1.5;
            margin-bottom: 30px;
            color: #333; /* Cor de texto mais escura para contraste */
        }

        .button {
            display: inline-block;
            background-color: #5a21cc;
            color: #fff;
            padding: 12px 25px;
            border-radius: 8px;
            text-decoration: none;
            transition: background-color 0.3s, transform 0.2s;
            font-size: 1.2rem;
            border: none;
            outline: none;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .button:hover {
            background-color: #320080;
            transform: scale(1.05); /* Pequeno efeito de zoom */
        }

        footer {
            margin-top: 30px;
            font-size: 0.9rem;
            color: #777;
        }
    </style>
    <title>Redefinição de Senha</title>
</head>
<body>
    <div class="container">
        <h1>Medfy</h1>
        <p>Clique no botão a seguir para redefinir sua senha. Certifique-se de que o link abaixo não tenha expirado.</p>
        <a class="button" href="${ link }">Redefinir Senha</a>
        <footer>
            <p>&copy; 2024 Medfy. Todos os direitos reservados.</p>
        </footer>
    </div>
</body>
</html>
	`;

	return sendEmail( email, subject, text, html );
};
