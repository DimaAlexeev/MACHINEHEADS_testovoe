import Cookies from 'js-cookie';
import { Tokens, ValidationError } from './types';

// куки живут столько же, сколько сами токены
export function saveTokens(tokens: Tokens) {
  Cookies.set('access_token', tokens.access_token, {
    expires: new Date(tokens.access_expired_at * 1000),
  });
  Cookies.set('refresh_token', tokens.refresh_token, {
    expires: new Date(tokens.refresh_expired_at * 1000),
  });
}

export function removeTokens() {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
}

export function parseApiError(e: any): { message: string; fields: ValidationError[] } {
  if (e.response?.status === 422 && Array.isArray(e.response.data)) {
    return { message: 'Проверьте заполнение полей', fields: e.response.data };
  }
  if (e.response?.data?.message) {
    return { message: e.response.data.message, fields: [] };
  }
  return { message: 'Что-то пошло не так, попробуйте еще раз', fields: [] };
}
