import { EducationalContent } from '../types/education';

export const dummyEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Introduction to Investment Strategies',
    description: 'Learn the basics of investment strategies and portfolio management.',
    type: 'video',
    url: 'https://example.com/videos/investment-basics',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800',
    categoryId: 'cat_1',
    tags: ['investment', 'basics', 'portfolio'],
    status: 'published',
    visibility: ['basic', 'premium', 'enterprise'],
    duration: 45,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    publishedAt: '2024-03-01T12:00:00Z',
    author: 'Eduardo Reyes',
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'Advanced Real Estate Investment Guide',
    description: 'Deep dive into real estate investment opportunities and analysis.',
    type: 'pdf',
    url: 'https://example.com/docs/real-estate-guide',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    categoryId: 'cat_2',
    tags: ['real-estate', 'advanced', 'analysis'],
    status: 'published',
    visibility: ['premium', 'enterprise'],
    duration: 60,
    createdAt: '2024-02-15T09:00:00Z',
    updatedAt: '2024-02-15T09:00:00Z',
    publishedAt: '2024-02-15T11:00:00Z',
    author: 'Sofia Valladares',
    views: 850,
    likes: 67
  },
  {
    id: '3',
    title: 'Market Analysis Techniques',
    description: 'Learn how to analyze market trends and make informed decisions.',
    type: 'article',
    url: 'https://example.com/articles/market-analysis',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    categoryId: 'cat_1',
    tags: ['market-analysis', 'trends'],
    status: 'draft',
    visibility: ['premium', 'enterprise'],
    createdAt: '2024-03-10T14:00:00Z',
    updatedAt: '2024-03-10T14:00:00Z',
    author: 'Carmen Flores',
    views: 0,
    likes: 0
  }
];

export const categories = [
  { id: 'cat_1', name: 'Investment Basics', description: 'Fundamental investment concepts', slug: 'investment-basics' },
  { id: 'cat_2', name: 'Advanced Investing', description: 'Advanced investment strategies', slug: 'advanced-investing' },
  { id: 'cat_3', name: 'Market Analysis', description: 'Market analysis techniques', slug: 'market-analysis' }
];

export const tags = [
  { id: 'tag_1', name: 'Investment', slug: 'investment' },
  { id: 'tag_2', name: 'Real Estate', slug: 'real-estate' },
  { id: 'tag_3', name: 'Market Analysis', slug: 'market-analysis' },
  { id: 'tag_4', name: 'Basics', slug: 'basics' },
  { id: 'tag_5', name: 'Advanced', slug: 'advanced' }
];