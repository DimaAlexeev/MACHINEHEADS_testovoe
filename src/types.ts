export interface Tokens {
  access_token: string;
  refresh_token: string;
  access_expired_at: number;
  refresh_expired_at: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface Picture {
  id: number;
  name: string;
  url: string;
}

export interface Post {
  id: number;
  title: string;
  code: string;
  authorName: string | null;
  previewPicture: Picture | null;
  tagNames: string[];
  updatedAt: string;
  createdAt: string;
}

export interface PostDetail {
  id: number;
  title: string;
  code: string;
  text: string;
  previewPicture: Picture | null;
  author: { id: number; fullName: string } | null;
  tags: Tag[];
  updatedAt: string;
  createdAt: string;
}

export interface Author {
  id: number;
  name: string;
  lastName: string;
  secondName: string;
  avatar: Picture | null;
  updatedAt: string;
  createdAt: string;
}

export interface AuthorDetail extends Author {
  shortDescription: string | null;
  description: string | null;
}

export interface Tag {
  id: number;
  name: string;
  code: string;
  sort: number;
  updatedAt: string;
  createdAt: string;
}
