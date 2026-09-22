import { Router } from 'express';
import { validate } from '../../lib/validation-middleware';
import { login, register, confirm, changePsw } from './auth.controller';
import { ChangePswDto, ConfirmDto, LoginDto, RegisterDto } from './auth.dto';
import { isAuthenticated } from '../../lib/auth/authenticated.middleware';

const router = Router();

router.post('/register', validate(RegisterDto, 'body'), register);
router.post('/login', validate(LoginDto, 'body'), login);
router.use(isAuthenticated)
router.get('/confirmEmail', validate(ConfirmDto, 'query'), confirm);
router.post('/changePsw', validate(ChangePswDto, 'body'), changePsw)

export default router;
