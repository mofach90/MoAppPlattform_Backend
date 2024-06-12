import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { users } from './passport-config';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: Function,
    ) => {
      logging.info({ profile });
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
      return done(null, user);
    },
  ),
);
