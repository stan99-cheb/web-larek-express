import { logger } from '../config/logger.js';
import { maintainOrderLimit } from '../utils/order-limit.js';
import asyncHandler from '../utils/async-handler.js';
import Order from '../models/order-model.js';

export const createOrder = asyncHandler(async (req, res) => {
  logger.info('Создание нового заказа', { body: req.body });

  const newOrder = new Order(req.body);
  await newOrder.save();
  await maintainOrderLimit();

  logger.info(`Заказ создан с ID: ${newOrder._id}, общая сумма: ${newOrder.total}`);

  res.status(201).json({
    'id': newOrder._id,
    'total': newOrder.total,
  });
});
