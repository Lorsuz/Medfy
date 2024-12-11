import { z } from "zod";
import { isCPF } from 'brazilian-values';


// Função para validar a senha
export const passwordValidation = z.string().min(1, "Este campo é obrigatório")
	.min( 8, 'A senha deve ter no mínimo 8 caracteres.' )
	.refine( password => /[a-z]/.test( password ), 'A senha deve conter pelo menos uma letra minúscula.' )
	.refine( password => /[A-Z]/.test( password ), 'A senha deve conter pelo menos uma letra maiúscula.' )
	.refine( password => /\d/.test( password ), 'A senha deve conter pelo menos um número.' )
	.refine( password => /[@$!#%*?&]/.test( password ), 'A senha deve conter pelo menos um caractere especial.' );

export const emailValidation = z.string().min(1, "Este campo é obrigatório")
	.min( 1, 'E-mail é obrigatório' )
	.email( 'E-mail inválido' );

export const cpfValidation = z.string().min(1, "Este campo é obrigatório")
	.length( 14, 'O CPF deve ter 14 caracteres (xxx.xxx.xxx-xx)' )
	.regex( /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato xxx.xxx.xxx-xx.' )
	.refine( cpf => isCPF( cpf ), 'O CPF deve ser válido' );

// Schema para registro de usuário
export const registerSchema = z.object( {
	name: z.string().min(1, "Este campo é obrigatório")
		.min( 3, 'O nome deve ter no mínimo 3 caracteres.' )
		.regex( /^[a-zA-ZÀ-ÿ\s]+$/, 'O nome não pode conter números ou caracteres especiais.' )
		.refine( value => value.trim().split( /\s+/ ).length >= 2, 'O nome deve ter pelo menos 2 palavras',
		),
	email: emailValidation,
	cpf: cpfValidation,
	phone: z.string().min(1, "Este campo é obrigatório").regex( /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/, 'O telefone deve estar no formato (00) 0 0000-0000' ),
	password: passwordValidation,
	confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres"),
} ).refine((data) => data.password === data.confirmPassword, {
	message: "As senhas não coincidem",
	path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});
