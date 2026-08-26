import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute = ({ children, ...rest }: any) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return <Route {...rest} render={() => (isAuth ? children : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
