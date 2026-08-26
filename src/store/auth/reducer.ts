import { AnyAction } from 'redux';
import Cookies from 'js-cookie';
import { ValidationError } from '../../types';
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from './actions';

export interface AuthState {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  validationErrors: ValidationError[];
}

const initialState: AuthState = {
  isAuth: !!Cookies.get('refresh_token'),
  loading: false,
  error: null,
  validationErrors: [],
};

export default function authReducer(state = initialState, action: AnyAction): AuthState {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, error: null, validationErrors: [] };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isAuth: true };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        validationErrors: action.payload.fields,
      };
    case LOGOUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
}
