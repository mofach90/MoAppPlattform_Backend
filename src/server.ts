import 'dotenv/config';
import express from 'express';
import logger from './loggingFramework/logger';
import { jsonParser } from './middleware/bodyParser';
import { corsMiddleware } from './middleware/cors';
import { formBasedAuth } from './middleware/formBasedAuthentication';
import { sanitizeMiddleware } from './middleware/sanitize';
import { sessionFactory } from './middleware/sessionFactory';
import { assignPort } from './utilities/assignPort';
import { checkSessionSecretKey } from './utilities/checkSessionSecretKey';

import { basicAuthMiddleware } from './middleware/basicauth';
import { verifyJwtFromLocalStorage } from './middleware/verifyJwtFromLocalStorage';
import { tokenGenerator } from './utilities/generateToken';
import { verifyJwtFromCookie } from './middleware/verifyJwtFromCookie';
import cors from 'cors';
const app = express();

checkSessionSecretKey();

const port = assignPort();

app.use(sessionFactory);
app.use(corsMiddleware);
app.use(jsonParser);
app.use(sanitizeMiddleware); // Middleware to sanitize inputs, Helps protect against XSS and other injection attacks by cleaning user inputs before processing or storing them.

app.get('/', (_, res) => {
  res.status(200).send('Welcome to MoAppBackend ');
});

app.get('/basicauthentication', basicAuthMiddleware, (_, res) => {
  res.status(200).send('Welcome to MoAppBackend - Basic Authentication ');
});

app.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.status(200).send({ isAuthenticatedSessionId: true });
  } else {
    res.status(401).send({ isAuthenticatedSessionId: false });
  }
});

app.get(
  '/check-auth-jwt-local-storage',
  verifyJwtFromLocalStorage,
  (req, res) => {
    res.set('Content-Type', 'application/json; charset=utf-8');
    res
      .status(200)
      .send({ message: 'Valid Token', isAuthenticatedJwtLocalStorage: true });
  },
);
app.get('/check-auth-jwt-cookie', verifyJwtFromCookie, (req, res) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  res
    .status(200)
    .send({ message: 'Valid Token', isAuthenticatedJwtCookie: true });
});

app.post('/loginJwt-in-localStorage', formBasedAuth, (req, res) => {
  const token = tokenGenerator(req.body.userName);
  res.setHeader('Authorization', `Bearer ${token}`);
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
});

app.post('/loginJwt-in-cookie', formBasedAuth, (req, res) => {
  const token = tokenGenerator(req.body.userName);
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'login successful', token });
  logger.info('JWT Based Authentication Succeeded');
});

app.post('/login', formBasedAuth, (req, res) => {
  // help against forms of session fixation
  req.session.regenerate(function (err) {
    if (err) {
      logger.error('Session regeneration failed', { error: err });
      return res.status(500).send('Internal Server Error');
    }
    req.session.user = req.body.userName;
    req.session.save(function (err) {
      if (err) {
        logger.error('Session save failed', { error: err });
        return res.status(500).send('Internal Server Error');
      }
      res
        .status(200)
        .json({ message: 'Login successful', sessionID: req.sessionID });
    });
  });
  logger.info( 'Form-Based-Succeeded');
});

app.get('/test', (_, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send('<h1>success status 200</h1>');
});

const server = app.listen(port, () => {
  logger.info(`server running at http:\\localhost:${port}`);
});

export { app, server };
