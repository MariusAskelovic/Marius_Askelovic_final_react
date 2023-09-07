import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='w-full bg-stone-800 py-2'>
      <div className='container flex justify-between items-center text-white'>
        <Link to={'/'}>
          <img className='h-12 pl-2' src='/images/logo.png' alt='logo' />
        </Link>
        <nav className='flex gap-4 uppercase text-sm'>
          <NavLink
            className='border-b-2 pb-1 border-transparent hover:border-orange-600'
            to={'/shops'}
          >
            Shops
          </NavLink>
          <NavLink
            className={`border-b-2 pb-1 border-transparent hover:border-orange-600`}
            to={'/register'}
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
