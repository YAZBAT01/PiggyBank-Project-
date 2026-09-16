import { Router } from 'express';
import { validate } from '../../lib/validation-middleware';
import { login, register } from './auth.controller';
import { LoginDto, RegisterDto } from './auth.dto';

const router = Router();

router.post('/register', validate(RegisterDto, 'body'), register);
router.post('/login', validate(LoginDto, 'body'), login);

export default router;
