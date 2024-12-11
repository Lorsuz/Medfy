export interface FromClientForRegister {
	name: string;
	email: string;
	password: string;
	cpf: string;
	profileImage?: string;
	verified?: boolean;
	role?: 'user' | 'admin';
};

export interface FromClientForLogin {
	email: string;
	password: string;
};

export interface FromClientForUpdate {
	name: string;
	email: string;
	cpf: string;
	profileImage: string;
};

export interface FromClientForChangePassword {
	password: string;
	newPassword: string;
};

export interface FromClientForDelete {
	email: string;
	password: string;
};

export interface ForImportAllUsers {
	users: FromClientForRegister[];
};