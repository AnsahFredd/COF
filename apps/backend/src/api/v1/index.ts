import { Router } from 'express';
import authRouter from 'src/api/v1/routes/auth.routes';
const router = Router();

router.use('/auth', authRouter);
export default router;
