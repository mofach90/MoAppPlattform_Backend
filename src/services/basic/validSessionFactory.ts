import logger from '../../config/logger';

export const validSessions = new Map<string, string>();

export async function addSessionToDataBase(userId: string, sessionId: string) {
  validSessions.set(userId, sessionId);
}

export function removeSessionFromDataBase(userId: string) {
  validSessions.delete(userId);
}

export function isValidSession(userId: string, sessionId: string): boolean {
  return validSessions.get(userId) === sessionId;
}

function filterSessionFromDataBase(sessionId: string): Map<string, string> {
  const matchingEntries = new Map<string, string>();
  for (const [userId, sId] of validSessions.entries()) {
    if (sId === sessionId) {
      matchingEntries.set(userId, sId);
    }
  }
  return matchingEntries;
}

export function purgeSessionDataBase(sessionId: string) {
  const matchingEntries = filterSessionFromDataBase(sessionId);
  if (matchingEntries) {
    for (const [userId] of matchingEntries.entries()) {
      removeSessionFromDataBase(userId);
    }
  }
}

// Only for Dev
export function clearAllSessionsFromDataBase() {
  validSessions.clear();
  logger.info('All session IDs cleared');
}
