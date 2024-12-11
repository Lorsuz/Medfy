/* import { mercadopago } from '../config/router.config';
import {Router} from 'express'
const router = Router();
router.post('/create_preference', async (req, res) => {
	try {
			const { title, quantity, unit_price } = req.body;

			const preference = {
					items: [
							{
									title, // Nome do item
									quantity, // Quantidade
									currency_id: 'BRL', // Moeda (BRL para real)
									unit_price // Preço unitário
							}
					],
					back_urls: {
							success: 'https://seusite.com/sucesso', // URL de sucesso
							failure: 'https://seusite.com/falha',   // URL de falha
							pending: 'https://seusite.com/pending'  // URL de pagamento pendente
					},
					auto_return: 'approved' // Retorna automaticamente se aprovado
			};

			const response = await mercadopago.preferences.create(preference);
			res.json({ id: response.body.id, init_point: response.body.init_point }); // init_point contém o link para o checkout
	} catch (error:any) {
			console.error(error);
			res.status(500).send('Erro ao criar preferência.');
	}
});

router.post('/notifications', (req, res) => {
	console.log('Webhook recebido:', req.body);
	res.status(200).send('Ok'); // Confirmação para o Mercado Pago
});

router.post('/api/plans', async (req, res) => {
  const { name, price, frequency_type, free_trial_days } = req.body;
  const planData = {
    reason: name,
    auto_recurring: {
      frequency: 1,
      frequency_type: frequency_type,
      transaction_amount: price,
      currency_id: 'BRL',
      free_trial: {
        frequency: free_trial_days,
        frequency_type: 'days',
      },
    },
  };
  try {
    const plan = await mercadopago.preapproval_plan.create(planData);
    res.status(201).json(plan);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/webhooks', (req, res) => {
  const event = req.body;
  if (event.type === 'payment') {
    // Atualize o banco de dados
  }
  res.sendStatus(200);
});

router.post('/api/payment', async (req, res) => {
  const { title, quantity, price } = req.body;
  const preference = {
    items: [
      {
        title,
        quantity,
        unit_price: price,
      },
    ],
    back_urls: {
      success: 'https://yourdomain.com/success',
      failure: 'https://yourdomain.com/failure',
      pending: 'https://yourdomain.com/pending',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/subscriptions/cancel', async (req, res) => {
  const { subscriptionId } = req.body;

  try {
    await mercadopago.preapproval.update(subscriptionId, { status: 'cancelled' });
    res.status(200).json({ message: 'Assinatura cancelada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; */