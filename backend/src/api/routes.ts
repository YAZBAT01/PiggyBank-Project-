import { Router } from 'express';
import authRouter from './auth/auth.router';
import usersRouter from './user/user.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use(authRouter);

export default router;
