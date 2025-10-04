import { logger } from '../config/logger.js';

export interface CustomError extends Error {
  status?: number;
  message: string;
  code?: number;
  keyPattern?: { [fieldName: string]: 1 | -1 };
}

const createError = (message: string, status = 400) => {
  const error: CustomError = new Error(message);
  error.status = status;

  logger.error({
    status: error.status,
    message: error.message,
  });

  return error;
};

export default createError;
