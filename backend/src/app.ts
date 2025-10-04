import express from 'express';
import router from './routes/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './config/logger.js';
import connectDB from './config/database.js';
import errorHandler from './middleware/error-handler.js';
import notFoundHandler from './middleware/not-found-handler.js';
import requestLogger from './middleware/request-logger.js';

dotenv.config({ override: true });

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
];

logger.info('Старт приложения', {
  nodeVersion: process.version,
  environment: process.env.NODE_ENV || 'development',
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(requestLogger);

app.use(router);

app.use(notFoundHandler);

app.use(errorHandler);

connectDB();

app.listen(port, () => {
  logger.info(`Сервер запущен на порту ${port}`);
});
