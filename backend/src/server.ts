import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {env} from './config/env';
import {router} from './routes';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.listen(env.PORT, () =>
	console.log(`Server is running on port ${env.PORT}`),
);
