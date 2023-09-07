export default function RegisterPage() {
  return (
    <div className='container py-14 px-10 '>
      <h3 className='text-white text-xl text-center mb-3'>
        Create New Account
      </h3>
      <div className='bg-white py-4 px-3 text-center rounded-xl'>
        <form className='inline-flex flex-col items-center'>
          <input
            className='py-1 px-2 border rounded-md mb-3'
            type='email'
            placeholder='email'
          />
          <input
            className='py-1 px-2 border rounded-md mb-3'
            type='password'
            placeholder='password'
            id='password'
          />
          <input
            className='py-1 px-2 border rounded-md mb-5'
            type='password'
            placeholder='confirm password'
            id='confirmPassword'
          />
          <button className='border border-neutral-300 rounded-md bg-gray-100 px-4 py-1 text-xs text-neutral-600 uppercase font-semibold'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
