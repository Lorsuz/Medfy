import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

const router = Router();

router.route( '/subscriptions' )
	.get( isAuthenticated, subscriptionController.getSubscriptions ) // Lista todas as assinaturas
	.post( isAuthenticated, subscriptionController.createSubscription ); // Cria uma nova assinatura

router.route( '/subscriptions/:id' )
	.get( isAuthenticated, subscriptionController.getSubscription ) // Obtém detalhes de uma assinatura específica
	.put( isAuthenticated, subscriptionController.updateSubscription ) // Atualiza uma assinatura
	.delete( isAuthenticated, subscriptionController.cancelSubscription ); // Cancela uma assinatura

export default router;
