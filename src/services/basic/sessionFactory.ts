import 'dotenv/config';
import session from 'express-session';

const sessionFactory = session({
  secret: process.env.SESSION_SECRET_KEY ?? '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax', // helps against Cross-Site Request Forgery (CSRF) attacks
  },
  store: new session.MemoryStore()
});




export { sessionFactory };
