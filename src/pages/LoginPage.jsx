import GoogleAuth from '../auth/GoogleAuth';

export default function LoginPage() {
  return (
    <div className='container text-neutral-300 text-center py-20'>
      <h2 className='text-2xl'>Welcome to our page</h2>
      <h1 className='text-8xl pt-4 pb-7 text-neutral-100 font-bold '>Shops</h1>
      <p className='text-lg'>Login to enter</p>
      <div>
        <h4>Alternative Login Methods:</h4>
        <GoogleAuth />
      </div>
    </div>
  );
}
