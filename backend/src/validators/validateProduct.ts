import { type IProduct, ProductCategory } from '../models/product-model.js';
import asyncHandler from '../utils/async-handler.js';
import createError from '../utils/create-error.js';
import type { NextFunction, Request, Response } from 'express';
import validator from 'validator';

const validateProduct = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const { category, description, image, price, title }: IProduct = req.body;

  if (!category || !image || !title) {
    throw createError('category, image, и title являются обязательными');
  }

  const errors: string[] = [];

  if (!Object.values(ProductCategory).includes(category)) {
    errors.push(`Поле category должно быть одним из: ${Object.values(ProductCategory).join(', ')}`);
  }

  if (description && typeof description !== 'string') {
    errors.push('Поле description должно быть строкой');
  }

  if (typeof image !== 'object') {
    errors.push('Поле image должно быть объектом');
  }

  if (
    typeof image.fileName !== 'string' ||
    typeof image.originalName !== 'string'
  ) {
    errors.push('Поля fileName и originalName объекта image должны быть строками');
  }

  if (price !== undefined && typeof price !== 'number') {
    errors.push('Поле price должно быть числом');
  }

  if (typeof title !== 'string') {
    errors.push('Поле title должно быть строкой');
  }

  if (errors.length > 0) {
    throw createError(errors.join('; '));
  }

  const sanitizedDescription = description ? validator.escape(description) : undefined;
  const sanitizedTitle = validator.escape(title);

  if (sanitizedDescription && !validator.isLength(sanitizedDescription, { min: 2, max: 255 })) {
    errors.push('Поле description должно быть строкой длиной от 2 до 255 символов');
  }

  if (!validator.isLength(sanitizedTitle, { min: 2, max: 30 })) {
    errors.push('Поле title должно быть строкой длиной от 2 до 30 символов');
  }

  if (image.fileName && !/^\/images\/[\w,\s-]+\.(jpg|jpeg|png|gif)$/i.test(image.fileName)) {
    errors.push('Поле fileName должно быть путем к файлу в папке /images/ с расширением jpg, jpeg, png или gif');
  }

  if (image.originalName && !/^[\w,\s-]+\.(jpg|jpeg|png|gif)$/i.test(image.originalName)) {
    errors.push('Поле originalName должно быть названием файла с расширением jpg, jpeg, png или gif');
  }

  if (errors.length > 0) {
    throw createError(errors.join('; '));
  }

  req.body = {
    category,
    description: sanitizedDescription,
    image,
    price,
    title: sanitizedTitle,
  };

  next();
});

export default validateProduct;
