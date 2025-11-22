/**
 * @file portfolio.ts
 * @description
 * Service for managing portfolio items.
 * Provides operations for fetching, creating, and deleting portfolio items.
 */

import { api } from './api';

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePortfolioItemData {
  title: string;
  description?: string;
  category?: string;
  image: File;
}

export const portfolioService = {
  /**
   * Get all portfolio items
   */
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return api.get<PortfolioItem[]>('/portfolio');
  },

  /**
   * Create a new portfolio item with image upload
   */
  async createPortfolioItem(data: CreatePortfolioItemData): Promise<PortfolioItem> {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.category) {
      formData.append('category', data.category);
    }
    formData.append('image', data.image);

    return api.post<PortfolioItem>('/portfolio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Delete a portfolio item
   */
  async deletePortfolioItem(id: string): Promise<{ success: boolean }> {
    return api.delete<{ success: boolean }>(`/portfolio/${id}`);
  },
};

export default portfolioService;
