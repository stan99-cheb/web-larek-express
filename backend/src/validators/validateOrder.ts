import { type IOrder, PaymentMethod } from '../models/order-model.js';
import asyncHandler from '../utils/async-handler.js';
import createError from '../utils/create-error.js';
import mongoose from 'mongoose';
import Product from '../models/product-model.js';
import type { NextFunction, Request, Response } from 'express';
import validator from 'validator';

const validateOrder = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const { payment, email, phone, address, total, items }: IOrder = req.body;

  if (!payment || !email || !phone || !address || total === undefined || !items) {
    throw createError('Все поля payment, email, phone, address, total, items обязательны');
  }

  const errors: string[] = [];

  if (!Object.values(PaymentMethod).includes(payment)) {
    errors.push(`Поле payment должно быть одним из: ${Object.values(PaymentMethod).join(', ')}`);
  }

  if (!validator.isEmail(email)) {
    errors.push('Некорректный email');
  }

  if (!validator.isMobilePhone(phone.replace(/[\s()-]/g, ''), 'ru-RU')) {
    errors.push('Некорректный номер телефона. Ожидается российский формат.');
  }

  if (typeof address !== 'string') {
    errors.push('Поле address должно быть строкой');
  }

  if (typeof total !== 'number') {
    errors.push('Поле total должно быть числом');
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push('Поле items должно быть непустым массивом');
  }

  if (items.some(item => !mongoose.Types.ObjectId.isValid(item))) {
    errors.push('Поле items должно содержать только действительные ObjectId');
  }

  if (errors.length > 0) {
    throw createError(errors.join('; '));
  }

  const sanitizedEmail = validator.normalizeEmail(email);
  const sanitizedPhone = validator.escape(phone);
  const sanitizedAddress = validator.escape(address);

  if (!validator.isLength(sanitizedAddress, { min: 2, max: 30 })) {
    errors.push('Поле address должно быть строкой длиной от 2 до 30 символов');
  }

  if (total <= 0) {
    errors.push('Поле total должно быть больше 0');
  }

  if (items.some(item => typeof item !== 'string')) {
    errors.push('Поле items должно быть массивом строк');
  }

  const existingProducts = await Product
    .find({ _id: { $in: items }, price: { $ne: null } })
    .lean();
  if (existingProducts.length !== items.length) {
    errors.push('Все или некоторые _id из items не существуют в коллекции Products или не имеют цены');
  }

  const calculatedTotal = existingProducts.reduce(
    (sum, product) => sum + (product.price || 0),
    0,
  );
  if (calculatedTotal !== total) {
    errors.push(`Поле total должно быть равно сумме цен продуктов: ${calculatedTotal}`);
  }

  if (errors.length > 0) {
    throw createError(errors.join('; '));
  }

  req.body = {
    payment,
    email: sanitizedEmail,
    phone: sanitizedPhone,
    address: sanitizedAddress,
    total,
    items,
  };

  next();
});

export default validateOrder;