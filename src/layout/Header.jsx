import { Link, NavLink } from 'react-router-dom';

export default function Header() {
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
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
            to={'/shops'}
          >
            Shops
          </NavLink>
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
            to={'/addshop'}
          >
            Add Shop
          </NavLink>
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
            to={'/login'}
          >
            Login
          </NavLink>
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
            to={'/register'}
          >
            Register
          </NavLink>
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600 duration-400 hover:duration-200'
            to={'/login'}
          >
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
