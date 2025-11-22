import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import router from './api/v1/index';
import { errorHandler } from './middlewares/error.middleware';
const app = express();
app.use(helmet());
app.use(morgan('dev'));

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use('/api/v1', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.send('OK'));
app.use(errorHandler);

export default app;
