import type { Request, Response } from 'express';

const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).send('Маршрут не найден');
};

export default notFoundHandler;
