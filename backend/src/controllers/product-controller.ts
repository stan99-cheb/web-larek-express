import { logger } from '../config/logger.js';
import asyncHandler from '../utils/async-handler.js';
import Product from '../models/product-model.js';
import type { Request, Response } from 'express';

export const getProduct = asyncHandler(async (_req: Request, res: Response) => {
  logger.info('Получение списка продуктов');

  const products = await Product.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
  const total = await Product.countDocuments();

  logger.info(`Найдено продуктов: ${products.length}, всего документов: ${total}`);

  res.json({
    items: products,
    total,
  });
});

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  logger.info('Создание нового продукта', { body: req.body });

  const newProduct = new Product(req.body);
  await newProduct.save();

  logger.info(`Продукт создан с ID: ${newProduct._id}`);

  res.status(201).json({ id: newProduct._id });
});
