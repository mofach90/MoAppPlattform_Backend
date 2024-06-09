import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const tokenGenerator = (user: string) => {
  return jwt.sign({ user: `${user}` }, process.env.JWT_SECRET ?? '', {
    expiresIn: '1h',
  });
};
