import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import logger from './logger';

export interface User {
  id: string;
  googleId: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

export const users: User[] = []; // In-memory user store

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user || null);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL ?? '',
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function,
    ) => {
      let user = users.find((user) => user.googleId === profile.id);
      if (!user) {
        user = {
          id: profile.id,
          googleId: profile.id,
          username: profile.displayName,
          email: profile?.emails?.[0]?.value ?? '',
        };
        users.push(user);
      }
      logger.info('Current users', users);
      return done(null, user);
    },
  ),
);

export default passport;
