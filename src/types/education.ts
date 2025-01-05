```typescript
export type ContentStatus = 'draft' | 'published' | 'archived';
export type ContentType = 'video' | 'article' | 'pdf';
export type UserTier = 'basic' | 'premium' | 'enterprise';

export interface ContentCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface ContentTag {
  id: string;
  name: string;
  slug: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  url: string;
  thumbnailUrl?: string;
  categoryId: string;
  tags: string[];
  status: ContentStatus;
  visibility: UserTier[];
  duration?: number; // in minutes
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author: string;
  views: number;
  likes: number;
}
```