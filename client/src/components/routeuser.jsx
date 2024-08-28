import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(userContext);

  const isAuthenticated =  Object.entries(user).length > 1;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;