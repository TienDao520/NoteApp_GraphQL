import { createBrowserRouter, Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import AuthProvider from '../context/AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import ErrorPage from '../pages/ErrorPage';
import NoteList from '../components/NoteList';

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: '/login',
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: '/',
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
              },
            ],
          },
        ],
      },
      // {
      //   element: <Home />,
      //   path: '/',
      // },
    ],
  },
]);
