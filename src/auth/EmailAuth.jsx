import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function EmailAuth() {
  const navigate = useNavigate();
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
    onSubmit: () => {
      emailLogin(formik.values.email, formik.values.password);
    },
  });
  function emailLogin(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user.email;
        navigate('/', { replace: true });
        toast.success(`welcome back ${user}`, { style: { fontSize: '12px' } });
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
        <Button>Login</Button>
      </form>
    </div>
  );
}
