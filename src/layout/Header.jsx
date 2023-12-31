import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { FaBars } from 'react-icons/fa';
import BurgerMenu from '../components/BurgerMenu';
import { useState } from 'react';

export default function Header() {
  const ctx = useAuth();
  const [burgerMenuVisibility, setBurgerMenuVisibility] = useState(false);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success('Logout success');
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  function toggleBurgerMenu() {
    setBurgerMenuVisibility(!burgerMenuVisibility);
  }

  return (
    <header className='w-full bg-[#1f1f1f] py-2'>
      <div className='container max-w-4xl flex justify-between items-center text-zinc-400'>
        <Link to={'/'}>
          <img
            className='h-10 sm:h-12 transition-all duration-200'
            src='/images/logo.png'
            alt='logo'
          />
        </Link>
        <nav className='hidden items-center gap-4 uppercase text-xs sm:text-sm transition sm:flex'>
          {ctx.loginStatus && (
            <NavLink
              className='leading-6 py-[2px] duration-400 hover:duration-200 decoration-orange-600  decoration-2 underline-offset-[6px] hover:underline'
              to={'/'}
            >
              Shops
            </NavLink>
          )}
          {ctx.loginStatus && (
            <NavLink
              className='leading-6 py-[2px] duration-400 hover:duration-200 decoration-orange-600  decoration-2 underline-offset-[6px] hover:underline'
              to={'/addshop'}
            >
              Add Shop
            </NavLink>
          )}
          {!ctx.loginStatus && (
            <NavLink
              className='leading-6 py-[2px] duration-400 hover:duration-200 decoration-orange-600  decoration-2 underline-offset-[6px] hover:underline'
              to={'/'}
            >
              Login
            </NavLink>
          )}
          {!ctx.loginStatus && (
            <NavLink
              className='leading-6 py-[2px] duration-400 hover:duration-200 decoration-orange-600  decoration-2 underline-offset-[6px] hover:underline'
              to={'/register'}
            >
              Register
            </NavLink>
          )}
          {ctx.loginStatus && (
            <Link
              className='leading-6 py-[2px] px-3 bg-orange-600 rounded-lg text-white hover:bg-red-600 transition duration-200'
              to={'/'}
              onClick={logout}
            >
              Logout
            </Link>
          )}
        </nav>
        <FaBars
          className='text-zinc-400 sm:hidden'
          size={28}
          onClick={toggleBurgerMenu}
        />
        <BurgerMenu
          isVisible={burgerMenuVisibility}
          toggleMenu={toggleBurgerMenu}
        />
      </div>
    </header>
  );
}
