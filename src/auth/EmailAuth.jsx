import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

export default function EmailAuth() {
  const initialValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Minimum password length 6 symbols')
      .required('Password is required'),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      emailLogin(formik.values.email, formik.values.password);
    },
  });
  function emailLogin(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('user ===', user);
        // ...
      })
      .catch(() => {
        toast.error('wrong email or password');
      });
  }
  return (
    <div>
      <form className='text-center' onSubmit={formik.handleSubmit}>
        <div>
          <div className='mb-3'>
            <input
              className='w-full py-1 px-2 text-black'
              type='string'
              placeholder='email'
              id='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className='text-red-600'>{formik.errors.email}</p>
            )}
          </div>
          <div className='mb-3'>
            <input
              className='w-full py-1 px-2  text-black'
              type='password'
              placeholder='password'
              id='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className='text-red-600'>{formik.errors.password}</p>
            )}
          </div>
        </div>
        <button
          className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300 text-black mb-2'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
}
