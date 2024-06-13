import logger from "../../config/logger";

export const validSessionIds = new Set<string>();

let count : number = 0

export async function addSessionId(sessionId: string) {
  validSessionIds.add(sessionId);
  count = count + 1
  logger.info("validSessionIds Status after validSessionIds.add(sessionId) from addSessionId function:  ", Array.from(validSessionIds))
  logger.info({count})
}

export function removeSessionId(sessionId: string) {
  validSessionIds.delete(sessionId);

  logger.info("validSessionIds from removeSession:  ", Array.from(validSessionIds))
}

export function isValidSessionId(sessionId: string): boolean {
  return validSessionIds.has(sessionId);
}

export function clearAllSessionIds() {
  validSessionIds.clear();
  count = 0;
  logger.info("All session IDs cleared");
}
