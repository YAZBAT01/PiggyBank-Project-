import { NextFunction, Request, Response } from 'express';

export class InvalidPasswordError extends Error {
  constructor() {
    super();
    this.message = 'Password not valid';
    this.name = 'Invalid';
  }
};

export const InvalidHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InvalidPasswordError) {
    res.status(400);
    res.json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
}
