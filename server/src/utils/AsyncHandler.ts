import { Request, Response, NextFunction, RequestHandler } from 'express';

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncHandler = (requestHandler: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise
      .resolve(requestHandler(req, res, next))
      .catch((err) => { next(err) })
  }
};

export default asyncHandler;