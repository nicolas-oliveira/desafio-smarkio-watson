import routes from './routes';
import path from 'path';
import express from 'express';
import cors from 'cors';
import './database';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

export default app;
