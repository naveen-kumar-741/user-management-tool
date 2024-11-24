import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const auth = localStorage.getItem('jwtToken');

  return auth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
