import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3500',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
};

const corsMiddleware = cors(corsOptions);
export { corsMiddleware };
