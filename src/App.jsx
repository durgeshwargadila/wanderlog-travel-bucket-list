import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BucketListProvider } from './context/BucketListContext';
import { Navbar } from './components/Layout/Navbar';
import { ScrollToTop } from './components/Layout/ScrollToTop';
import { PrivateRoute } from './components/Layout/PrivateRoute';
import { ROUTES } from './constants/routes';

// Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExplorePage from './pages/ExplorePage';
import CountryDetailPage from './pages/CountryDetailPage';
import BucketListPage from './pages/BucketListPage';
import NotFoundPage from './pages/NotFoundPage';

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="main-content-layout">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BucketListProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
              <Route path={ROUTES.COUNTRY_DETAIL} element={<CountryDetailPage />} />
              <Route path={ROUTES.BUCKET_LIST} element={<BucketListPage />} />
            </Route>
          </Route>

          {/* fallback 404 */}
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </BucketListProvider>
    </AuthProvider>
  );
}
