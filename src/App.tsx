import { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Spin } from 'antd';
import { history } from './store';
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const PostsListPage = lazy(() => import('./pages/PostsListPage'));
const PostFormPage = lazy(() => import('./pages/PostFormPage'));
const AuthorsListPage = lazy(() => import('./pages/AuthorsListPage'));
const AuthorFormPage = lazy(() => import('./pages/AuthorFormPage'));
const TagsListPage = lazy(() => import('./pages/TagsListPage'));

const App = () => (
  <ConnectedRouter history={history}>
    <Suspense
      fallback={
        <div style={{ textAlign: 'center', padding: 100 }}>
          <Spin size="large" />
        </div>
      }
    >
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/">
          <AppLayout>
            <Switch>
              <Route exact path="/posts" component={PostsListPage} />
              <Route exact path="/posts/add" component={PostFormPage} />
              <Route exact path="/posts/:id/edit" component={PostFormPage} />
              <Route exact path="/authors" component={AuthorsListPage} />
              <Route exact path="/authors/add" component={AuthorFormPage} />
              <Route exact path="/authors/:id/edit" component={AuthorFormPage} />
              <Route exact path="/tags" component={TagsListPage} />
              <Redirect to="/posts" />
            </Switch>
          </AppLayout>
        </PrivateRoute>
      </Switch>
    </Suspense>
  </ConnectedRouter>
);

export default App;
