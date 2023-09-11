import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function BurgerMenu({ isVisible, toggleMenu }) {
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
    <>
      {isVisible && (
        <div
          className='fixed min-h-screen min-w-full bg-zinc-950 opacity-95
      bg-cover z-50 top-0 left-0 flex flex-col items-center gap-7 justify-center sm:hidden'
          onClick={toggleMenu}
        >
          <Link
            className='text-4xl font-bold hover:text-orange-600 transition duration-200'
            to={'/shops'}
          >
            Shops
          </Link>
          {ctx.loginStatus && (
            <Link
              className='text-4xl font-bold hover:text-orange-600 transition duration-200'
              to={'/addshop'}
            >
              Add Shop
            </Link>
          )}
          {!ctx.loginStatus && (
            <Link
              className='text-4xl font-bold hover:text-orange-600 transition duration-200'
              to={'/'}
            >
              Login
            </Link>
          )}
          {!ctx.loginStatus && (
            <Link
              className='text-4xl font-bold hover:text-orange-600 transition duration-200'
              to={'/register'}
            >
              Register
            </Link>
          )}
          {ctx.loginStatus && (
            <Link
              className='text-4xl font-bold hover:text-orange-600 transition duration-200 '
              to={'/'}
              onClick={logout}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </>
  );
}
