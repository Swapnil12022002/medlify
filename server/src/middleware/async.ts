import { Request, Response, NextFunction } from "express";

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

const asyncHandler =
  (fn: AsyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
