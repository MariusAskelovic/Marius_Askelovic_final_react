import GoogleAuth from '../auth/GoogleAuth';

export default function LoginPage() {
  return (
    <div className='container text-neutral-300 text-center py-20'>
      <h2 className='text-2xl'>Welcome to our page</h2>
      <h1 className='text-7xl pt-4 pb-7 text-neutral-100 font-semibold'>
        Shops
      </h1>
      <p>Login to enter</p>
      <GoogleAuth />
    </div>
  );
}
