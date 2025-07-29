import { ApiError } from "../utils/ApiError";
import type { NextFunction, Request, Response, ErrorRequestHandler } from "express";



export const errorConvertor: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = 400;
        const message = error.message || statusCode;
        error = new ApiError(statusCode, message);
    }
    next(error);
}

export const errorHandler: ErrorRequestHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const response = {
        code: statusCode,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }
    if (process.env.NODE_ENV === 'development') {
        console.error("Error:", err);
    }
    res.status(statusCode).json(response);
}



