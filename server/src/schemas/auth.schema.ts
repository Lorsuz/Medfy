import { z as zod } from 'zod';
import { isCPF } from 'brazilian-values';

// Função para validar a senha
export const passwordValidation = zod.string()
	.min( 8, 'A senha deve ter no mínimo 8 caracteres.' )
	.refine( password => /[a-z]/.test( password ), 'A senha deve conter pelo menos uma letra minúscula.' )
	.refine( password => /[A-Z]/.test( password ), 'A senha deve conter pelo menos uma letra maiúscula.' )
	.refine( password => /\d/.test( password ), 'A senha deve conter pelo menos um número.' )
	.refine( password => /[@$!#%*?&]/.test( password ), 'A senha deve conter pelo menos um caractere especial.' );

export const emailValidation = zod.string()
	.min( 1, 'E-mail é obrigatório' )
	.email( 'E-mail inválido' );

export const cpfValidation = zod.string()
	.length( 14, 'O CPF deve ter 14 caracteres (xxx.xxx.xxx-xx)' )
	.regex( /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato xxx.xxx.xxx-xx.' )
	.refine( cpf => isCPF( cpf ), 'O CPF deve ser válido' );

// Schema para registro de usuário
export const registerUserSchema = zod.object( {
	name: zod.string()
		.min( 3, 'O nome deve ter no mínimo 3 caracteres.' )
		.regex( /^[a-zA-ZÀ-ÿ\s]+$/, 'O nome não pode conter números ou caracteres especiais.' )
		.refine( value => value.trim().split( /\s+/ ).length >= 2, 'O nome deve ter pelo menos 2 palavras',
		),
	email: emailValidation,
	cpf: cpfValidation,
	phone: zod.string().regex( /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/, 'O telefone deve estar no formato (xx) x xxxx-xxxx' ),
	password: passwordValidation,
} );

export const loginUserSchema = zod.object( {
	email: emailValidation,
	password: zod.string().min( 8, 'A senha deve ter no mínimo 8 caracteres' ),
} );

// Schema para solicitação de redefinição de senha
export const resetPasswordSchema = zod.object( {
	email: emailValidation,
} );

// Schema para redefinição de senha
export const newPasswordSchema = zod.object( {
	token: zod.string().min( 1, 'Token é obrigatório' ),
	password: passwordValidation,
} );
