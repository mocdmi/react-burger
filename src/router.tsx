import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from './components/auth-layout/auth-layout';
import { Layout } from './components/layout/layout';
import { ModalIngredientsDetailsRoute } from './components/modal-ingredients-details-route/modal-ingredients-details-route';
import { ModalOrdersHistoryDetailsRoute } from './components/modal-orders-history-details-route/modal-orders-history-details-route';
import { ProfileLayout } from './components/profile-layout/profile-layout';
import { ProtectedRoute } from './components/protected-route/protected-route';
import { FeedDetailsPage } from './pages/feed-details/feed-details';
import { FeedPage } from './pages/feed/feed';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password';
import { HomePage } from './pages/home/home';
import { IngredientDetailsPage } from './pages/ingredient-details/ingredient-details';
import { LoginPage } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { OrderDetailsPage } from './pages/profile/order-details/order-details';
import { OrdersPage } from './pages/profile/orders/orders';
import { UserDetailsPage } from './pages/profile/user-details/user-details';
import { RegisterPage } from './pages/register/register';
import { ResetPasswordPage } from './pages/reset-password/reset-password';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: ModalIngredientsDetailsRoute,
        children: [
          {
            path: '/ingredients/:id',
            Component: IngredientDetailsPage,
          },
        ],
      },
      {
        path: '/feed',
        Component: FeedPage,
      },
      {
        Component: ModalOrdersHistoryDetailsRoute,
        children: [
          {
            path: '/feed/:id',
            Component: FeedDetailsPage,
          },
        ],
      },
      {
        Component: AuthLayout,
        children: [
          {
            element: <ProtectedRoute onlyUnAuth />,
            children: [
              {
                path: '/login',
                Component: LoginPage,
              },
              {
                path: '/register',
                Component: RegisterPage,
              },
              {
                path: '/forgot-password',
                Component: ForgotPasswordPage,
              },
              {
                path: '/reset-password',
                Component: ResetPasswordPage,
              },
            ],
          },
        ],
      },
      {
        Component: ProfileLayout,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: '/profile',
                Component: UserDetailsPage,
              },
              {
                path: '/profile/orders',
                Component: OrdersPage,
              },
              {
                path: '/profile/orders/:id',
                Component: OrderDetailsPage,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);
