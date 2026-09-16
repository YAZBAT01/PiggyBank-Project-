import { Router } from 'express';
import { me } from './user.controller';

const router = Router();

router.get('/me', me);

export default router;
