import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className='w-full bg-stone-800 py-4 text-white text-sm text-center bottom-0'>
      <div className='container  grid md:grid-cols-4'>
        <div className='pb-3'>
          <h2 className='font-semibold text-xl'>Shops</h2>
          <p className='text-neutral-400 leading-6'>
            Marius A. final project for CodeAcademy JS/React course
          </p>
        </div>
        <div className='pb-3'>
          <h3 className='font-semibold pb-3'>Information</h3>
          <ul>
            <li className='pb-1'>
              <Link
                className='text-neutral-400 hover:text-red-600 underline w-fit'
                to={'/'}
              >
                FAQ
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                className='text-neutral-400 hover:text-red-600 underline'
                to={'/'}
              >
                Site Map
              </Link>
            </li>
            <li className='pb-1'>
              <Link
                className='text-neutral-400 hover:text-red-600 underline'
                to={'/'}
              >
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className='pb-3'>
          <h3 className='font-semibold pb-3'>Contact Us</h3>
          <div className='inline-flex flex-col gap-2 text-neutral-400 '>
            <Link
              className='hover:text-red-600 inline-block'
              to={'tel:+37060000000'}
            >
              Phone: (+370) 600 00000
            </Link>
            <Link className='hover:text-red-600' to={'email:info@mail.com'}>
              Email: info@mail.com
            </Link>
          </div>
        </div>
        <div>
          <h3 className='font-semibold pb-3'>Social Icons</h3>
          <ul className='flex gap-2 items-center text-neutral-400 justify-center'>
            <li>
              <FaFacebook className='hover:text-neutral-200' />
            </li>
            <li>
              <FaXTwitter className='hover:text-neutral-200' />
            </li>
            <li>
              <FaInstagram size={18} className='hover:text-neutral-200' />
            </li>
            <li>
              <FaYoutube size={20} className='hover:text-neutral-200' />
            </li>
            <li>
              <FaTiktok className='hover:text-neutral-200' />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
