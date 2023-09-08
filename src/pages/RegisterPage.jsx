import Button from '../components/Button';

export default function RegisterPage() {
  return (
    <div className='container py-20 '>
      <h3 className='text-white text-xl text-center mb-3'>
        Create New Account
      </h3>
      <form className='text-center'>
        <div>
          <input
            className='w-full py-1 px-2 mb-2'
            type='email'
            placeholder='email'
            id='email'
          />
          <input
            className='w-full py-1 px-2 mb-3'
            type='password'
            placeholder='password'
            id='password'
          />
        </div>
        <Button>Register</Button>
      </form>
    </div>
  );
}
