import axios from 'axios';
import Cookies from 'js-cookie';
import { Author, AuthorDetail, Post, PostDetail, Tag, Tokens } from './types';
import { removeTokens, saveTokens } from './utils';

const API_URL = import.meta.env.VITE_API_URL || 'https://rest-test.machineheads.ru';

export const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// при 401 пробуем обновить токен и повторить запрос
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get('refresh_token');

    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const fd = new FormData();
        fd.append('refresh_token', refreshToken);
        // здесь голый axios, чтобы не попасть в этот же интерсептор
        const { data } = await axios.post<Tokens>(API_URL + '/auth/token-refresh', fd);
        saveTokens(data);
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalRequest);
      } catch (e) {
        removeTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

// auth
export const login = (email: string, password: string) => {
  const fd = new FormData();
  fd.append('email', email);
  fd.append('password', password);
  return api.post<Tokens>('/auth/token-generate', fd);
};

// posts
export const getPosts = (page: number) => api.get<Post[]>('/manage/posts', { params: { page } });
export const getPost = (id: number) =>
  api.get<PostDetail>('/manage/posts/detail', { params: { id } });
export const addPost = (data: FormData) => api.post('/manage/posts/add', data);
export const editPost = (id: number, data: FormData) =>
  api.post('/manage/posts/edit', data, { params: { id } });
export const deletePost = (id: number) => api.delete('/manage/posts/remove', { params: { id } });

// authors
export const getAuthors = () => api.get<Author[]>('/manage/authors');
export const getAuthor = (id: number) =>
  api.get<AuthorDetail>('/manage/authors/detail', { params: { id } });
export const addAuthor = (data: FormData) => api.post('/manage/authors/add', data);
export const editAuthor = (id: number, data: FormData) =>
  api.post('/manage/authors/edit', data, { params: { id } });
export const deleteAuthor = (id: number) =>
  api.delete('/manage/authors/remove', { params: { id } });

// tags
export const getTags = () => api.get<Tag[]>('/manage/tags');
export const addTag = (data: FormData) => api.post('/manage/tags/add', data);
export const editTag = (id: number, data: FormData) =>
  api.post('/manage/tags/edit', data, { params: { id } });
export const deleteTag = (id: number) => api.delete('/manage/tags/remove', { params: { id } });
