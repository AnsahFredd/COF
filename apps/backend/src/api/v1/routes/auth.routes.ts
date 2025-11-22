import { Router } from 'express';
import { register, login } from 'src/api/v1/controllers/auth.controller';
import { userController } from 'src/api/v1/controllers/user.controller';
import { validate } from 'src/middlewares/validation.middleware';
import { registerSchema, loginSchema } from 'src/api/v1/dtos/auth.dto';
import { authenticate } from 'src/middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.get('/me', authenticate, userController.getCurrentUser);

export default authRouter;
