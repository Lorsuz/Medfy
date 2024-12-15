import expressAsyncHandler from 'express-async-handler';
import { crypto, pool, bcrypt, ApiError } from '../config/router.config.js';
import { generateProfileImageUrl, getFirstAndLastName } from '../utils/stringOperations.js';
import { generateToken } from '../config/jwt.config.js';
import { setAuthCookie } from '../config/cookie.config.js';
import { users } from '../exports/preDatabase.js';
import { verifyEmail, sendResetEmail } from '../services/email.service.js';
import { registerUserSchema, newPasswordSchema, resetPasswordSchema, loginUserSchema } from '../schemas/auth.schema.js';

// #region import users
/**
 *	@desc			Import all user admin
 *	@route		POST /api/users/import-all
 *	@access		private
 **/

export const importUsers = expressAsyncHandler( async ( req, res, next ) => {
	try {
		await pool.execute( "DELETE FROM users WHERE role = 'admin'" );
		// await pool.execute( 'DELETE * FROM tokens' );
		let createdUsers: any[] = [];
		users.forEach( async ( user ) => {
			user.password = bcrypt.hashSync( user.password, 10 );
			user.profileImage = generateProfileImageUrl( user.name );
			const hashedPassword = bcrypt.hashSync( user.password, 10 );
			const createdUser = await pool.execute(
				'INSERT INTO users (name, email, password, profileImage, cpf, role, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[ user.name, user.email, hashedPassword, user.profileImage, user.cpf, user.role, user.verified ]
			);
			createdUsers.push( createdUser );
		} );
		res.status( 201 ).send( createdUsers );
	} catch ( error ) {
		next( error );
	}
} );

// #endregion

// #region login

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		public
 **/

export const login = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { email, password } = loginUserSchema.parse( req.body );

		if ( !email || !password ) {
			res.status( 400 ).json( { message: 'Email e senha são obrigatórios' } );
			return;
		}

		const [ users ]: any = await pool.execute( 'SELECT * FROM users WHERE email = ?', [ email ] );

		if ( !users || users.length === 0 ) {
			res.status( 401 ).json( { message: 'Credenciais inválidas' } ); // Mensagem genérica
			return;
		}

		const user = users[ 0 ];

		if ( !user.verified ) {
			res.status( 401 ).json( { message: 'Usuário não verificado' } );
			return;
		}

		const isPasswordValid = bcrypt.compareSync( password, user.password );
		if ( !isPasswordValid ) {
			res.status( 401 ).json( { message: 'Credenciais inválidas' } ); // Mensagem genérica
			return;
		}

		const token = generateToken( user.id.toString(), user.role === "admin" );
		setAuthCookie( res, token );
		delete user.password;
		delete user.role;
		delete user.updatedAt;
		delete user.id;
		res.status( 200 ).json( {
			...user,
			name: getFirstAndLastName( user.name ),
			fullName: user.name,
			isAdmin: user.role === 'admin'
		} );
	} catch ( error ) {
		next( error ); // Encaminha o erro para middlewares
	}
} );


// #endregion

// #region register

/** 
 *	@desc			register user
 *	@route		POST /api/user/register
 *	@access		public
 **/

export const register = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { name, email, cpf, password, phone } = registerUserSchema.parse( req.body );
		let [ existingUsers ]: any = await pool.execute( 'SELECT * FROM users WHERE email = ?', [ email ] );
		if ( existingUsers.length > 0 ) {
			res.status( 400 ).json( { message: 'Email já cadastrado' } );
		}
		[ existingUsers ] = await pool.execute( 'SELECT * FROM users WHERE cpf = ?', [ cpf ] );
		if ( existingUsers.length > 0 ) {
			res.status( 400 ).json( { message: 'CPF já cadastrado' } );
		}
		const profileImage = generateProfileImageUrl( name );
		const hashedPassword = await bcrypt.hash( password, 10 );
		const [ result ]: any = await pool.execute(
			'INSERT INTO users (name, email, password, profileImage, cpf, phone) VALUES (?, ?, ?, ?, ?,?)',
			[ name, email, hashedPassword, profileImage, cpf, phone ]
		);
		const userId = result.insertId;
		const token = crypto.randomBytes( 16 ).toString( 'hex' );
		await pool.execute( 'INSERT INTO tokens (userId, token) VALUES (?, ?)', [ userId, token ] );
		const url = `${ process.env.API_URL }/user/verify-token?token=${ token }`;
		await verifyEmail( email, url );
		res.status( 201 ).json( { message: 'Verifique seu email' } );
	} catch ( error ) {
		next( error );
	}
} );

// #endregion

// #region verify token
/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		public
 **/

export const verifyToken = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const [ tokens ]: any = await pool.execute( 'SELECT * FROM tokens WHERE token = ?', [ req.query.token ] );
		if ( tokens.length > 0 ) {
			const token = tokens[ 0 ];
			const [ updateResult ]: any = await pool.execute( 'UPDATE users SET verified = ? WHERE id = ?', [ true, token.userId ] );
			if ( updateResult.affectedRows > 0 ) {
				console.log( 'Usuário verificado com sucesso, buscando informações do usuário...' );
				const [ rows ]: any = await pool.execute( 'SELECT email FROM users WHERE id = ?', [ token.userId ] );
				if ( rows.length > 0 ) {
					const user = rows[ 0 ];
					console.log( 'Verificando valor de user em verify login:', user );
				} else {
					console.error( 'Nenhum usuário encontrado com esse ID após o UPDATE' );
				}
			} else {
				console.error( 'Nenhuma linha foi atualizada' );
			}
			await pool.execute( 'DELETE FROM tokens WHERE userId = ?', [ token.userId ] );
			if ( process.env.APP_URL !== '' ) {
				res.status( 200 ).redirect( process.env.APP_URL || '' );
				return;
			}
			res.status( 200 ).send( 'Usuário verificado com sucesso' );

		} else {
			res.status( 400 ).json( { message: 'Invalid token' } );
		}
	} catch ( error ) {
		next( error );
	}
} );

// #endregion
export const validateJWT = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const user = req.user;
		// if ( !user ) {
		// 	res.status( 401 ).json( { isAuthenticated: false, message: 'Usuário não autenticado' } );
		// 	return;
		// }
		res.json( {
			isAuthenticated: true,
			isAdmin: user.isAdmin || false,
			message: 'Usuário autenticado com sucesso',
		} );
	} catch ( error ) {
		next( error );
	}
} );
// #region update profile

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		private
 **/

export const UpdatePersonalInfo = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const [ userRows ]: any = await pool.execute( 'SELECT * FROM users WHERE id = ?', [ req.user.id ] );

		if ( userRows.length > 0 ) {
			const user = userRows[ 0 ];

			const name: string = req.body.name || user.name;
			const email: string = req.body.email || user.email;
			const phone: number | string = req.body.phone || user.phone;
			const cpf: string = req.body.cpf || user.cpf;

			const [ updateResult ]: any = await pool.execute(
				`UPDATE users SET name = ?, email = ?, phone = ?, cpf=?  WHERE id = ?`,
				[ name, email, phone, cpf, req.user.id ]
			);

			if ( updateResult.affectedRows > 0 ) {
				const updatedUser = { ...user, name, email, phone, cpf };

				delete updatedUser.password;
				delete user.role;
				delete user.updatedAt;
				delete updatedUser.id;
				res.status( 200 ).json( {
					...updatedUser,
					name: getFirstAndLastName( updatedUser.name ),
					fullname: updatedUser.name,
					isAdmin: updatedUser.role === 'admin'
				} );
			} else {
				throw new ApiError( 'Failed to update user', 500 );
			}
		} else {
			throw new ApiError( 'User not found', 404 );
		}
	} catch ( error ) {
		next( error );
	}
} );

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		private
 **/

export const UpdateAcademicInfo = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const [ userRows ]: any = await pool.execute( 'SELECT * FROM users WHERE id = ?', [ req.user.id ] );

		if ( userRows.length > 0 ) {
			const user = userRows[ 0 ];

			const university = req.body.university || user.university;
			const period = req.body.period || user.period;
			const specialty = req.body.specialty || user.specialty;
			const trainingYear = req.body.trainingYear || user.trainingYear;

			const [ updateResult ]: any = await pool.execute(
				`UPDATE users SET university = ?, period = ?, specialty = ?, trainingYear = ?  WHERE id = ?`,
				[ university, period, specialty, trainingYear, req.user.id ]
			);

			if ( updateResult.affectedRows > 0 ) {
				const updatedUser = { ...user, university, period, specialty, trainingYear: trainingYear };

				delete updatedUser.password;
				delete updatedUser.role;
				delete updatedUser.updatedAt;
				delete updatedUser.id;
				res.status( 200 ).json( {
					...updatedUser,
					name: getFirstAndLastName( updatedUser.name ),
					fullname: updatedUser.name,
					isAdmin: updatedUser.role === 'admin'
				} );
			} else {
				throw new ApiError( 'Failed to update user' );
			}
		} else {
			res.status( 404 );
			throw new ApiError( 'User not found' );
		}
	} catch ( error ) {
		next( error );
	}
} );

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		private
 **/

export const UpdateMeetBy = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		if ( req.body.meetBy && typeof req.body.meetBy !== 'string' ) {
			res.status( 400 );
			throw new ApiError( 'Invalid meetBy value' );
		}
		const [ userRows ]: any = await pool.execute( 'SELECT * FROM users WHERE id = ?', [ req.user.id ] );

		if ( userRows.length > 0 ) {
			const user = userRows[ 0 ];

			const meetBy = req.body.meetBy || user.meetBy;

			const [ updateResult ]: any = await pool.execute(
				`UPDATE users SET meetBy = ?  WHERE id = ?`,
				[ meetBy, req.user.id ]
			);

			if ( updateResult.affectedRows > 0 ) {
				const updatedUser = { ...user, meetBy: meetBy };
				delete updatedUser.password;
				delete updatedUser.role;
				delete updatedUser.updatedAt;
				delete updatedUser.id;
				res.status( 200 ).json( {
					...updatedUser,
					name: getFirstAndLastName( updatedUser.name ),
					fullname: updatedUser.name,
					isAdmin: updatedUser.role === 'admin'
				} );
			} else {
				throw new ApiError( 'Failed to update user' );
			}
		} else {
			throw new ApiError( 'User not found', 404 );
		}
	} catch ( error ) {
		next( error );
	}
} );


// #endregion

// #region request reset

/**
 * @desc         Solicita recuperação de senha
 * @route        POST /api/user/request-reset
 * @access       Public
 **/

export const requestPasswordReset = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { email } = resetPasswordSchema.parse( req.body ); // valida o e-mail
		const [ existingUsers ]: any = await pool.execute( 'SELECT * FROM users WHERE email = ?', [ email ] );
		if ( existingUsers.length === 0 ) {
			throw new ApiError( "E-mail não encontrado", 404 );

		}

		const userId = existingUsers[ 0 ].id;
		const token = crypto.randomBytes( 16 ).toString( 'hex' );
		await pool.execute( 'INSERT INTO tokens (userId, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?', [ userId, token, token ] );

		const resetUrl = `${ process.env.APP_URL }/create-new-password/${ token }`;
		await sendResetEmail( email, resetUrl );
		res.status( 200 ).json( { message: 'Verifique seu e-mail para redefinir a senha' } );
	} catch ( error ) {
		next( error );
	}
} );

// #endregion

// #region reset password

/**
 * @desc         Redefine a senha do usuário
 * @route        POST /api/user/reset-password
 * @access       Public
 **/

export const resetPassword = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { token, password } = newPasswordSchema.parse( req.body );

		// Busca o userId e a senha antiga em uma única consulta
		const [ result ]: any[] = await pool.execute(
			`SELECT users.id AS userId, users.password AS oldPassword
					 FROM tokens
					 INNER JOIN users ON tokens.userId = users.id
					 WHERE tokens.token = ?`,
			[ token ]
		);

		if ( result.length === 0 ) {
			throw new ApiError( "Token inválido ou expirado", 400 );
		}

		const { userId, oldPassword } = result[ 0 ];

		// Compara a nova senha com a antiga
		const isSamePassword = await bcrypt.compare( password, oldPassword );
		if ( isSamePassword ) {
			throw new ApiError( "A nova senha não pode ser igual à senha anterior", 400 );
		}

		// Hash da nova senha
		const hashedPassword = await bcrypt.hash( password, 10 );

		// Atualiza a senha do usuário
		await pool.execute(
			'UPDATE users SET password = ? WHERE id = ?',
			[ hashedPassword, userId ]
		);

		// Remove o token usado
		await pool.execute( 'DELETE FROM tokens WHERE userId = ?', [ userId ] );

		res.status( 200 ).json( { message: 'Senha redefinida com sucesso' } );
	} catch ( error ) {
		next( error );
	}
} );


// #endregion

// #region change password

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		private
 **/

export const changePassword = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const { oldPassword, newPassword } = req.body;

		const [ userRows ]: any = await pool.execute( 'SELECT * FROM users WHERE id = ?', [ req.user.id ] );

		if ( userRows.length > 0 ) {
			const user = userRows[ 0 ];

			if ( bcrypt.compareSync( oldPassword, user.password ) ) {
				const hashedNewPassword = bcrypt.hashSync( newPassword, 10 );

				const [ updateResult ]: any = await pool.execute(
					'UPDATE users SET password = ? WHERE id = ?',
					[ hashedNewPassword, req.user.id ]
				);

				if ( updateResult.affectedRows > 0 ) {
					res.json( { message: 'Password changed successfully' } );
				} else {
					throw new ApiError( 'Failed to change password' );
				}
			} else {
				res.status( 401 );
				throw new ApiError( 'Invalid old password' );
			}
		} else {
			res.status( 404 );
			throw new ApiError( 'User not found' );
		}
	} catch ( error ) {
		next( error );
	}
} );

// #endregion

// #region delete user

/**
 * @desc Delete user
 * @route DELETE /api/users/users
 * @access private
 **/

export const deleteUser = expressAsyncHandler( async ( req: any, res, next ) => {
	try {
		const [ deleteUserResult ]: any = await pool.execute( 'DELETE FROM users WHERE id = ?', [ req.user.id ] );

		if ( deleteUserResult.affectedRows > 0 ) {
			await pool.execute( 'DELETE FROM orders WHERE userId = ?', [ req.user.id ] );
			res.clearCookie( 'authToken' );
			res.json( { message: 'User removed' } );
		} else {
			res.status( 404 );
			throw new ApiError( 'User not found' );
		}
	} catch ( error ) {
		next( error );
	}
} );

// #endregion

// #region get all users

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		public
 **/

export const getAllUsers = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const [ users ] = await pool.execute( 'SELECT * FROM users' );
		res.json( users );
	} catch ( error ) {
		next( error );
	}
} );


// #endregion

// #region log out

/**
 *	@desc			auth user & get token
 *	@route		POST /api/users/login
 *	@access		private
 **/

export const logOut = expressAsyncHandler( async ( req, res, next ) => {
	try {
		res.clearCookie( 'authToken' );
		res.status( 200 ).json( { message: 'Sessão encerrada com sucesso!' } );
	} catch ( error ) {
		next( error );
	}
} );

// #endregion
