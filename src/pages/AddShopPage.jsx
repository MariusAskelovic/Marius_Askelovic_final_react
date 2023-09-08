import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

export default function AddShopPage() {
  const initialValues = {
    shopName: '',
    description: '',
    startYear: '',
    town: '',
    imageUrl: '',
  };
  const validationSchema = Yup.object({
    shopName: Yup.string()
      .min(4, 'Minimum 4 symbols')
      .required('Shop Name is required'),
    description: Yup.string()
      .min(6, 'Minimum 6 symbols')
      .required('Description is required'),
    startYear: Yup.number()
      .min(1970, 'Year must be between 1970 and 2025')
      .max(2025, 'Year must be between 1970 and 2025')
      .required('Shop Start Date is required'),
    town: Yup.string().min(4, 'Minimum 4 symbols').required('Town is required'),
    imageUrl: Yup.string()
      .min(5, "Image link can't be shorted than 5 symbols")
      .required('Image link is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className='container'>
      <form className='text-center' onSubmit={formik.handleSubmit}>
        <div>
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='Shop name'
            id='shopName'
            onChange={formik.handleChange}
            value={formik.values.shopName}
          />

          <input
            className='w-full py-1 px-2 mb-2'
            type='number'
            placeholder='Year we started'
            id='startYear'
            onChange={formik.handleChange}
            value={formik.values.startYear}
          />
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='Town'
            id='town'
            onChange={formik.handleChange}
            value={formik.values.town}
          />
          <textarea
            className='w-full py-1 px-2 mb-2'
            placeholder='Description'
            id='description'
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
          <input
            className='w-full py-1 px-2 mb-3'
            type='url'
            placeholder='Image Link'
            id='imageUrl'
            onChange={formik.handleChange}
            value={formik.values.imageUrl}
          />
        </div>
        <button
          className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300'
          type='submit'
        >
          Create
        </button>
      </form>
    </div>
  );
}
