import { Router } from 'express';
import orderRouter from './order-route.js';
import productRouter from './product-route.js';

const router = Router();

router.use('/product', productRouter);
router.use('/order', orderRouter);

export default router;
