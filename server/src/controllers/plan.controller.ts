import expressAsyncHandler from 'express-async-handler';
import { pool, ApiError } from '../config/router.config.js';
import { MercadoPagoConfig } from 'mercadopago';
import { mpApi } from '../services/api.service.js';

// Configuração do Mercado Pago
const client = new MercadoPagoConfig( { accessToken: process.env.MERCADO_PAGO_API_KEY || '' } );

// Obter todos os planos
export const getPlans = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const plans = await mpApi.get( '/preapproval_plan/search' );
		res.status( 200 ).json( plans.data );
	} catch ( error ) {
		next( error );
	}
} );

// Obter um plano específico
export const getPlan = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const plan = await mpApi.get( 'preapproval_plan/' + id );
		res.json( plan.data );
	} catch ( error ) {
		next( error );
	}
} );

// Criar um plano
export const createPlan = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { name, price, duration, description } = req.body;

		// Criação do plano no banco de dados
		const [ result ]: any = await pool.query(
			'INSERT INTO plans (name, price, duration, description) VALUES (?, ?, ?, ?)',
			[ name, price, duration, description ]
		);

		// Dados para o plano no Mercado Pago
		const body = {
			reason: name,  // Nome do plano como descrição
			auto_recurring: {
				frequency: 1,
				frequency_type: "months",
				repetitions: duration,  // Duração do plano em meses
				billing_day: 10,
				billing_day_proportional: false,
				free_trial: {
					frequency: 1,
					frequency_type: "months"
				},
				transaction_amount: price,  // Preço do plano
				currency_id: "BRL",  // Usando BRL para o preço
			},
			payment_methods_allowed: {
				payment_types: [
					{
						id: "credit_card"
					}
				],
				payment_methods: [
					{
						id: "bolbradesco"
					}
				]
			},
			back_url: 'http://www.your-site.com/thank_you',  // URL de retorno
		};

		// Criação do plano no Mercado Pago
		const planResponse = { status: 200, body: { id: '123' } }; // Comentar essa linha após implementar a chamada ao Mercado Pago
		// const planResponse = await planAPI.create({ body });

		// Verifica se a criação foi bem-sucedida
		if ( planResponse.status !== 201 ) {
			throw new ApiError( 'Erro ao criar o plano no Mercado Pago', 500 );
		}

		// Caso a criação no Mercado Pago tenha sido bem-sucedida, retornamos os dados
		res.status( 201 ).json( {
			message: 'Plano criado com sucesso',
			planId: result.insertId,
			mercadoPagoPlanId: planResponse.body.id,  // ID do plano no Mercado Pago
		} );
	} catch ( error ) {
		next( error );
	}
} );


// Atualizar um plano
export const updatePlan = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;
		const { name, price, duration, description } = req.body;

		// Atualizar o plano no banco de dados
		await pool.query(
			'UPDATE plans SET name = ?, price = ?, duration = ?, description = ? WHERE id = ?',
			[ name, price, duration, description, id ]
		);

		res.json( { message: 'Plano atualizado' } );
	} catch ( error ) {
		next( error );
	}
} );

// Deletar um plano
export const deletePlan = expressAsyncHandler( async ( req, res, next ) => {
	try {
		const { id } = req.params;

		// Excluir o plano no banco de dados
		await pool.query( 'DELETE FROM plans WHERE id = ?', [ id ] );

		res.json( { message: 'Plano deletado' } );
	} catch ( error ) {
		next( error );
	}
} );
