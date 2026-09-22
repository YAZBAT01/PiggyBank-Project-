import { Router } from 'express';
import { validate } from '../../lib/validation-middleware';
import { login, register, confirm } from './auth.controller';
import { ConfirmDto, LoginDto, RegisterDto } from './auth.dto';

const router = Router();

router.post('/register', validate(RegisterDto, 'body'), register);
router.post('/login', validate(LoginDto, 'body'), login);
router.get('/confirmEmail', validate(ConfirmDto, 'query'), confirm);

export default router;
