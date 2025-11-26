"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const client_1 = require("@prisma/client");
const storage_1 = require("../../../libs/storage");
const prisma = new client_1.PrismaClient();
class PortfolioService {
    static async createPortfolioItem(data) {
        const { title, description, category, file } = data;
        // Upload image to S3
        const imageUrl = await (0, storage_1.uploadFile)(file, 'portfolio');
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
    static async deletePortfolioItem(id) {
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
            await (0, storage_1.deleteFile)(key);
        }
        // Delete from database
        return prisma.portfolio.delete({
            where: { id },
        });
    }
}
exports.PortfolioService = PortfolioService;
