import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/userContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(userContext);

  // Check if the user is authenticated
  const isAuthenticated =  Object.entries(user).length > 1;

  // Render the element if authenticated, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;