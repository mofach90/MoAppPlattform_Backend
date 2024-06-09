import 'dotenv/config';

export function assignPort() {
  return process.env.PORT ?? (process.env.NODE_ENV === 'test' ? 4000 : 3000);
}
