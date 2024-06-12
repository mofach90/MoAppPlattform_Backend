import logger from "../../config/logger";

export const validSessionIds = new Set<string>();

export function addSessionId(sessionId: string) {
  validSessionIds.add(sessionId);
  logger.info("validSessionIds from addSession:  ", validSessionIds)
}

export function removeSessionId(sessionId: string) {
  validSessionIds.delete(sessionId);
  logger.info("validSessionIds from removeSession:  ", validSessionIds)
}

export function isValidSessionId(sessionId: string): boolean {
  return validSessionIds.has(sessionId);
}
