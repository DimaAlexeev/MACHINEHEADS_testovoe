import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import authReducer from './auth/reducer';
import authSaga from './auth/saga';
import postsReducer from './posts/reducer';
import postsSaga from './posts/saga';
import authorsReducer from './authors/reducer';
import authorsSaga from './authors/saga';
import tagsReducer from './tags/reducer';
import tagsSaga from './tags/saga';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  posts: postsReducer,
  authors: authorsReducer,
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

function* rootSaga() {
  yield all([authSaga(), postsSaga(), authorsSaga(), tagsSaga()]);
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
