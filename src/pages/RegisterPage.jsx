import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Button from '../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function RegisterPage() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('user ===', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log('errorCode ===', errorCode);
      const errorMessage = error.message;
      console.log('errorMessage ===', errorMessage);
      // ..
    });

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
