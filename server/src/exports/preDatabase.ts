import * as UserTypes  from '../types/user.types.js';

export const users: UserTypes.FromClientForRegister[] = [
	{
		name: 'João Ribeiro',
		email: 'onlineshop@gmail.com',
		password: '@Admin02',
		cpf: '123.452.678-90',
		verified: true,
		role: 'admin',
	}
];