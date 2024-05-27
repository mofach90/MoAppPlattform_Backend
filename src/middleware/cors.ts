import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3500",
  credentials: true, // Allow credentials (cookies)
  optionsSuccessStatus: 200, // option is used to ensure that a 200 status code is returned for preflight requests (an OPTIONS request sent to the server before the actual request, to check if the actual request is safe to send)
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
