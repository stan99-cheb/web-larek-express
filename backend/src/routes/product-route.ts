import { createProduct, getProduct } from '../controllers/product-controller.js';
import { Router } from 'express';
import validateProduct from '../validators/validateProduct.js';

const router = Router();

router.route('/')
  .get(getProduct)
  .post(validateProduct, createProduct);

export default router;