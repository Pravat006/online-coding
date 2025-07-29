import winston from "winston";

// Define custom severity levels type
interface CustomLevels {
    [key: string]: number;
    error: number;
    warn: number;
    info: number;
    http: number;
    debug: number;
}

// Define your severity levels.
const levels: CustomLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define level colors type
interface LevelColors {
    [key: string]: string;
    error: string;
    warn: string;
    info: string;
    http: string;
    debug: string;
}

const level = (): string => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};

const colors: LevelColors = {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "DD MMM, YYYY - HH:mm:ss:ms" }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
);

// Define which transports the logger must use to print out messages.
const transports: winston.transport[] = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/http.log", level: "http" }),
];

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default logger;