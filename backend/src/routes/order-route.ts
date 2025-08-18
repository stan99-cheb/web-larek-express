import { createOrder } from '../controllers/order-controller.js';
import { Router } from 'express';
import validateOrder from '../validators/validateOrder.js';

const router = Router();

router.route('/')
  .post(validateOrder, createOrder);

export default router;
