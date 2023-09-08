import { Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Shops from './pages/Shops';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddShopPage from './pages/AddShopPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='addshop' element={<AddShopPage />} />
        <Route path='/shops' element={<Shops />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
