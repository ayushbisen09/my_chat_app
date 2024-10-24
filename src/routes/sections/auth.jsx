import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

/** **************************************
 * Jwt
 *************************************** */
const Jwt = {
  SignInPage: lazy(() => import('src/pages/auth/jwt/sign-in')),
  SignUpPage: lazy(() => import('src/pages/auth/jwt/sign-up')),
  ForgotpasswordPage: lazy(() => import('src/pages/auth/jwt/forgot-password')),
  ConfirmPage: lazy(() => import('src/pages/auth/jwt/confirm')),
  RestPage: lazy(() => import('src/pages/auth/jwt/rest')),
};

const authJwt = {
  path: 'jwt',
  children: [
    {
      path: 'sign-in',
      element: (
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }}>
            <Jwt.SignInPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'sign-up',
      element: (
        <GuestGuard>
          <AuthSplitLayout>
            <Jwt.SignUpPage />
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'forgot-password',
      element: (
        <GuestGuard>
          <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }}>
            <Jwt.ForgotpasswordPage/>
          </AuthSplitLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'confirm',
      element: (
        <GuestGuard>
           {/* <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }} contentWidth="650px"> */}
            <Jwt.ConfirmPage/>
          {/* </AuthSplitLayout> */}
        </GuestGuard>
      ),
    },
    {
      path: 'rest',
      element: (
        <GuestGuard>
           {/* <AuthSplitLayout section={{ title: 'No Restrictions on Features!' }} contentWidth="650px"> */}
            <Jwt.RestPage/>
          {/* </AuthSplitLayout> */}
        </GuestGuard>
      ),
    },
  ],
};

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [authJwt],
  },
];