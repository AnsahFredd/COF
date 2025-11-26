"use strict";
/// <reference types="jest" />
Object.defineProperty(exports, "__esModule", { value: true });
const portfolio_service_1 = require("../api/v1/services/portfolio.service");
const storage_1 = require("../libs/storage");
const client_1 = require("@prisma/client");
// Mock dependencies
jest.mock('../libs/storage');
jest.mock('@prisma/client', () => {
    const mockPrisma = {
        portfolio: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrisma),
    };
});
const mockUploadFile = storage_1.uploadFile;
const mockDeleteFile = storage_1.deleteFile;
describe('PortfolioService', () => {
    let prisma;
    beforeEach(() => {
        prisma = new client_1.PrismaClient();
        jest.clearAllMocks();
    });
    describe('createPortfolioItem', () => {
        it('should upload file and create portfolio item', async () => {
            const mockFile = {
                originalname: 'test.jpg',
                buffer: Buffer.from('test'),
                mimetype: 'image/jpeg',
            };
            const mockImageUrl = 'https://s3.amazonaws.com/bucket/portfolio/test.jpg';
            const mockPortfolioItem = {
                id: '123',
                title: 'Test Portfolio',
                description: 'Test Description',
                category: 'Test Category',
                imageUrl: mockImageUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockUploadFile.mockResolvedValue(mockImageUrl);
            prisma.portfolio.create.mockResolvedValue(mockPortfolioItem);
            const result = await portfolio_service_1.PortfolioService.createPortfolioItem({
                title: 'Test Portfolio',
                description: 'Test Description',
                category: 'Test Category',
                file: mockFile,
            });
            expect(mockUploadFile).toHaveBeenCalledWith(mockFile, 'portfolio');
            expect(prisma.portfolio.create).toHaveBeenCalledWith({
                data: {
                    title: 'Test Portfolio',
                    description: 'Test Description',
                    category: 'Test Category',
                    imageUrl: mockImageUrl,
                },
            });
            expect(result).toEqual(mockPortfolioItem);
        });
    });
    describe('getPortfolioItems', () => {
        it('should retrieve all portfolio items ordered by createdAt desc', async () => {
            const mockItems = [
                {
                    id: '1',
                    title: 'Item 1',
                    imageUrl: 'url1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    title: 'Item 2',
                    imageUrl: 'url2',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ];
            prisma.portfolio.findMany.mockResolvedValue(mockItems);
            const result = await portfolio_service_1.PortfolioService.getPortfolioItems();
            expect(prisma.portfolio.findMany).toHaveBeenCalledWith({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            expect(result).toEqual(mockItems);
        });
    });
    describe('deletePortfolioItem', () => {
        it('should delete file from S3 and remove from database', async () => {
            const mockItem = {
                id: '123',
                title: 'Test',
                imageUrl: 'https://bucket.s3.us-east-1.amazonaws.com/portfolio/test.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            prisma.portfolio.findUnique.mockResolvedValue(mockItem);
            prisma.portfolio.delete.mockResolvedValue(mockItem);
            await portfolio_service_1.PortfolioService.deletePortfolioItem('123');
            expect(prisma.portfolio.findUnique).toHaveBeenCalledWith({
                where: { id: '123' },
            });
            expect(mockDeleteFile).toHaveBeenCalledWith('portfolio/test.jpg');
            expect(prisma.portfolio.delete).toHaveBeenCalledWith({
                where: { id: '123' },
            });
        });
        it('should throw error if portfolio item not found', async () => {
            prisma.portfolio.findUnique.mockResolvedValue(null);
            await expect(portfolio_service_1.PortfolioService.deletePortfolioItem('123')).rejects.toThrow('Portfolio item not found');
        });
    });
});
