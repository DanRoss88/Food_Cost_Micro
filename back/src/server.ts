import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import { DatabaseConnection } from './config/db';
import { Logger } from './config/logger';
import routes from './modules/food-cost/routes';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.connectDatabase();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use('/api/v1', routes);
  }

  private async connectDatabase() {
    await DatabaseConnection.connect();
    Logger.info('Database Connected');
  }

  public start() {
    this.app.listen(ENV.PORT, () => {
      Logger.info(`Server running on port ${ENV.PORT}`);
    });
  }
}

const server = new Server();
server.start();
