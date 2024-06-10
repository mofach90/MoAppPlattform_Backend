import { app } from './api/server';
import logger from './loggingFramework/logger';
import { assignPort } from './utilities/assignPort';

const port = assignPort();

export const server = app.listen(port, () => {
  logger.info(`server running at http:\\localhost:${port}`);
});
