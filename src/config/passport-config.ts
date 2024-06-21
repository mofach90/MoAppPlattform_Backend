import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import logger from './logger';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';

export interface User {
  id: string;
  googleId?: string;
  facebookId?: string;
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
      logger.info('Current users', users); // TODO delete when PRODUCTION
      return done(null, user);
    },
  ),
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID ?? '',
      clientSecret: process.env.FACEBOOK_APP_SECRET ?? '',
      callbackURL: process.env.FACEBOOK_CALLBACK_URL ?? '',
      profileFields: ['id', 'displayName', 'emails'],
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done: Function,
    ) => {
      let user = users.find((user) => user.facebookId === profile.id);
      if (!user) {
        user = {
          id: profile.id,
          facebookId: profile.id,
          username: profile.displayName,
          email: profile?.emails?.[0]?.value ?? '',
        };
        users.push(user);
      }
      logger.info('Current users', users);  // TODO delete when PRODUCTION
      return done(null, user);
    },
  ),
);

export default passport;
