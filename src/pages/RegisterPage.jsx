import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Button from '../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
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
      handleRegister(formik.values.email, formik.values.password);
    },
  });

  function handleRegister(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.email;
        toast.success(`welcome ${user}`, { style: { fontSize: '12px' } });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          toast.error(
            'email already registered \n try login or contact support',
            {
              style: {
                textAlign: 'center',
                fontSize: '14px',
              },
            }
          );
        } else if (errorCode === 'auth/invalid-email') {
          toast.error('invalid email address');
        } else {
          toast.error('something went wrong');
        }
      });
  }

  return (
    <div className='container py-20'>
      <h3 className='text-white text-xl text-center mb-3'>
        Create New Account
      </h3>
      <form className='text-center' onSubmit={formik.handleSubmit}>
        <div>
          <input
            className='w-full py-1 px-2 mb-2'
            type='email'
            placeholder='email'
            id='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-600'>{formik.errors.email}</p>
          )}
          <input
            className='w-full py-1 px-2 mb-3'
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
        <Button>Register</Button>
      </form>
    </div>
  );
}
