import { httpLogger } from '../config/logger.js';
import type { NextFunction, Request, Response } from 'express';

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  httpLogger.http('Incoming request', {
    method: req.method,
    url: req.url,
    // headers: req.headers,
  });

  next();
};

export default requestLogger;
