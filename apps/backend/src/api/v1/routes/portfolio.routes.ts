import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';
import { authenticate, requireRole } from 'src/middlewares/auth.middleware';
import multer from 'multer';

const portfolioRouter = Router();

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// All portfolio routes require ADMIN role
portfolioRouter.use(authenticate, requireRole('ADMIN'));

portfolioRouter.post('/', upload.single('image'), PortfolioController.create);
portfolioRouter.get('/', PortfolioController.getAll);
portfolioRouter.delete('/:id', PortfolioController.delete);

export default portfolioRouter;
