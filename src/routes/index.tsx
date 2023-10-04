import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
