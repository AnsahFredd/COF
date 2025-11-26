import { PrismaClient } from '@prisma/client';
import { uploadFile, deleteFile } from '../../../libs/storage';

const prisma = new PrismaClient();

export class PortfolioService {
  static async createPortfolioItem(data: {
    title: string;
    description?: string;
    category?: string;
    file: Express.Multer.File;
  }) {
    const { title, description, category, file } = data;

    // Upload image to S3
    const imageUrl = await uploadFile(file, 'portfolio');

    // Create portfolio item in database
    const portfolioItem = await prisma.portfolio.create({
      data: {
        title,
        description,
        category,
        imageUrl,
      },
    });

    return portfolioItem;
  }

  static async getPortfolioItems() {
    return prisma.portfolio.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async deletePortfolioItem(id: string) {
    const item = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!item) {
      throw new Error('Portfolio item not found');
    }

    // Delete image from S3
    // Extract key from URL
    const key = item.imageUrl.split('.com/').pop();
    if (key) {
      await deleteFile(key);
    }

    // Delete from database
    return prisma.portfolio.delete({
      where: { id },
    });
  }
}
