import { ValidationError } from '../../types';

export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';

export const login = (email: string, password: string) => ({
  type: LOGIN,
  payload: { email, password },
});

export const loginSuccess = () => ({ type: LOGIN_SUCCESS });

export const loginError = (message: string, fields: ValidationError[]) => ({
  type: LOGIN_ERROR,
  payload: { message, fields },
});

export const logout = () => ({ type: LOGOUT });
