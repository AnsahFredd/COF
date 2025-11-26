import { Request, Response } from 'express';
import { PortfolioService } from '../services/portfolio.service';

export class PortfolioController {
  static async create(req: Request, res: Response) {
    try {
      const { title, description, category } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Image file is required' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }

      const portfolioItem = await PortfolioService.createPortfolioItem({
        title,
        description,
        category,
        file,
      });

      res.status(201).json(portfolioItem);
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      res.status(500).json({ message: 'Failed to create portfolio item' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const items = await PortfolioService.getPortfolioItems();
      res.json(items);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      res.status(500).json({ message: 'Failed to fetch portfolio items' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await PortfolioService.deletePortfolioItem(id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      res.status(500).json({ message: 'Failed to delete portfolio item' });
    }
  }
}
