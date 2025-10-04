import { logger } from '../config/logger.js';
import type { CustomError } from '../utils/create-error.js';
import type { NextFunction, Request, Response } from 'express';

const errorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  let status = err.status || 500;
  let message = err.message || 'Внутренняя ошибка сервера';

  if (err.code === 11000 && err.keyPattern?.title) {
    status = 409;
    message = 'Продукт с таким title уже существует';

    logger.error('Ошибка создания продукта с дублирующимся title', { error: err });
  }

  res.status(status).send({
    message,
  });
};

export default errorHandler;
