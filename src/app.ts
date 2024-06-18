import { app } from './api/server';
import logger from './config/logger';
import { assignPort } from './services/utilities/assignPort';

const port = assignPort();

export const server = app.listen(port, () => {
  logger.info(`server running at http:\\localhost:${port}`);
});

