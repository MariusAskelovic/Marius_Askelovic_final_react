import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function Header() {
  const ctx = useAuth();

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

  return (
    <header className='w-full bg-stone-800 py-2'>
      <div className='container flex justify-between items-center text-white'>
        <Link to={'/'}>
          <img
            className='h-10 sm:h-12 pl-2 transition-all duration-200'
            src='/images/logo.png'
            alt='logo'
          />
        </Link>
        <nav className='flex gap-4 uppercase text-xs sm:text-sm transition'>
          {ctx.loginStatus && (
            <NavLink
              className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
              to={'/shops'}
            >
              Shops
            </NavLink>
          )}
          {ctx.loginStatus && (
            <NavLink
              className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
              to={'/addshop'}
            >
              Add Shop
            </NavLink>
          )}
          {!ctx.loginStatus && (
            <NavLink
              className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
              to={'/'}
            >
              Login
            </NavLink>
          )}
          {!ctx.loginStatus && (
            <NavLink
              className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
              to={'/register'}
            >
              Register
            </NavLink>
          )}
          {ctx.loginStatus && (
            <NavLink
              className='border-b-2 pb-1 border-transparent'
              to={'/'}
              onClick={logout}
            >
              Logout
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
