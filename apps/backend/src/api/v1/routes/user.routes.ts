import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate, requireRole } from '../../../middlewares/auth.middleware';
import { upload } from '../../../middlewares/upload.middleware';
import { validate } from '../../../middlewares/validation.middleware';
import { createUserSchema, updateUserSchema, changePasswordSchema } from '../dtos/user.dto';

const router = Router();

router.post(
  '/',
  authenticate,
  requireRole('ADMIN'),
  validate(createUserSchema),
  userController.create
);
router.get('/', authenticate, requireRole('ADMIN'), userController.getAll);
router.get('/me', authenticate, userController.getCurrentUser);
router.get('/:id', authenticate, userController.getById);
router.patch('/:id', authenticate, validate(updateUserSchema), userController.update);
router.delete('/:id', authenticate, requireRole('ADMIN'), userController.delete);
router.post(
  '/change-password',
  authenticate,
  validate(changePasswordSchema),
  userController.changePassword
);
router.post('/:id/avatar', authenticate, upload.single('avatar'), userController.uploadAvatar);

export default router;
