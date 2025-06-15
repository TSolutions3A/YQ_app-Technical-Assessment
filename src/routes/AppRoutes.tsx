// src/routes/AppRoutes.tsx
import { useRoutes } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Register from '../pages/Register';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        { path: 'reports', element: <Reports /> },
        { path: 'settings', element: <Settings /> },
      ],
    }
  ]);

  return routes;
};

export default AppRoutes;
