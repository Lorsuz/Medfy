import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../middlewares/auth.middleware.js';
import * as planController from '../controllers/plan.controller.js';
import * as subscriptionController from '../controllers/subscription.controller.js';

const router = Router();

// Rotas para Planos
router.route('/')
  .get(isAuthenticated, planController.getPlans) // Lista todos os planos
  .post(isAuthenticated, isAdmin, planController.createPlan); // Cria um novo plano

router.route('/:id')
  .get(isAuthenticated, planController.getPlan) // Obtém detalhes de um plano específico
  .put(isAuthenticated, isAdmin, planController.updatePlan) // Atualiza um plano
  .delete(isAuthenticated, isAdmin, planController.deletePlan); // Deleta um plano

export default router;
