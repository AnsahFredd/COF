import { Router } from 'express';
import { register, login } from 'src/api/v1/controllers/auth.controller';
import { validate } from 'src/middlewares/validation.middleware';
import { registerSchema, loginSchema } from 'src/api/v1/dtos/auth.dto';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);

export default authRouter;
