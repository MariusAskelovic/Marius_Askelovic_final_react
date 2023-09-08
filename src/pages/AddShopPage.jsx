import { addDoc, collection } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function AddShopPage() {
  const navigate = useNavigate();
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
      newShop();
    },
  });

  async function newShop() {
    try {
      const docRef = await addDoc(collection(db, 'shops'), {
        shopName: formik.values.shopName,
        description: formik.values.description,
        startYear: formik.values.startYear,
        town: formik.values.town,
        imageUrl: formik.values.imageUrl,
      });
      navigate('/shops');
      toast.success('New shop created');
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className='container py-14'>
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
            rows={3}
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
        <Button>Create</Button>
      </form>
    </div>
  );
}
