import morgan, { StreamOptions } from "morgan";
import logger from "./winston";

// Define a custom stream interface that writes to winston
const stream: StreamOptions = {
  // Use the http severity
  write: (message: string): void => { logger.http(message.trim()); },
};

// Uncomment if you want to skip logging in production
// const skip = (): boolean => {
//   const env = process.env.NODE_ENV || "development";
//   return env !== "development";
// };

const morganMiddleware = morgan(
  ":remote-addr :method :url :status - :response-time ms",
  { stream }
);

export default morganMiddleware;