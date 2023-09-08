export default function RegisterPage() {
  return (
    <div className='container py-14 px-10 '>
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
        <button
          className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300'
          type='submit'
        >
          Register
        </button>
      </form>
    </div>
  );
}
