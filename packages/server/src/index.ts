import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import config from './config/commons';
import connect from './config/db';
import routes from './config/routes';
import definition from './documentation/swagger';
import swaggerUi from "swagger-ui-express";

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())
connect(config.dbUrl);
routes(app);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(definition, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.host}:${config.port}`),
);




