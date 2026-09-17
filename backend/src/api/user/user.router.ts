import { Router } from 'express';
import { isAuthenticated } from '../../lib/auth/authenticated.middleware';
import { me } from './user.controller';
const router = Router();

router.use(isAuthenticated);
router.get('/me', me);

export default router;
