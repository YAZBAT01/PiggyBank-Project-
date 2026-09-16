import { NextFunction } from 'express';
import { TypedRequest } from '../../lib/typed-request.interface';

export const dashboard = async (  req: TypedRequest<RegisterDto>,
  res: Response,
  next: NextFunction,)