import { Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddShopPage from './pages/AddShopPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './store/AuthProvider';
import SingleShopPage from './pages/SingleShopPage';
import ShopsPage from './pages/ShopsPage';

export default function App() {
  const ctx = useAuth();
  return (
    <div className='min-h-screen flex flex-col'>
      <Toaster />
      <Header />
      <Routes>
        <Route
          path='/'
          element={ctx.loginStatus ? <ShopsPage /> : <LoginPage />}
        />
        {ctx.loginStatus && <Route path='addshop' element={<AddShopPage />} />}
        {ctx.loginStatus && (
          <Route path='/shop/:shopId' element={<SingleShopPage />} />
        )}
        {/* <Route path='/login' element={<LoginPage />} /> */}
        {!ctx.loginStatus && (
          <Route path='/register' element={<RegisterPage />} />
        )}
        {ctx.loginStatus && <Route path='*' element={<NotFoundPage />} />}
      </Routes>
      <Footer />
    </div>
  );
}
