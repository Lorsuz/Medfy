import axios from 'axios';

export const mpApi = axios.create(
	{
		baseURL: 'https://api.mercadopago.com',
		timeout: 5000,

		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${ process.env.MERCADO_PAGO_API_KEY }`
		},
	}
);