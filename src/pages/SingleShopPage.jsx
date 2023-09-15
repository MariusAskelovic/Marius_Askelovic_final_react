import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthProvider';
import Button from '../components/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function SingleShopPage() {
  const ctx = useAuth();
  const params = useParams();
  const [shopData, setShopData] = useState({});
  const [commentsArr, setCommentsArr] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    getComments();
  }, []);
  async function getData() {
    const docRef = doc(db, 'shops', params.shopId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setShopData(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  async function getComments() {
    const querySnapshot = await getDocs(
      collection(db, 'shops', params.shopId, 'comments')
    );
    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      });
      console.log('comments ===', comments);
    });
    setCommentsArr(comments);
  }

  const initialValues = {
    displayname: '',
    commentText: '',
    date: '',
  };
  // const validationSchema = Yup.object({});
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
      newComment();
    },
  });

  async function newComment() {
    // const date = new Date().toISOString();
    // console.log('date ===', date);
    const newComment = {
      displayName: formik.values.displayName,
      comment: formik.values.commentText,
    };
    try {
      await addDoc(collection(db, 'shops'), newComment);
      navigate('/');
      toast.success('New comment created');
    } catch (error) {
      navigate('/');
      toast.error(error);
    }
  }

  const { shopName, imageUrl, description, startYear, town } = shopData;
  return (
    <div className='container my-8 max-w-4xl'>
      <h1 className='text-white text-3xl font-extrabold'>{shopName}</h1>
      <div className='flex'>
        <h4 className='text-white text-sm font-semibold my-5'>
          {startYear} <span className='px-3'>/</span> {town}
        </h4>
      </div>
      <img className='w-full' src={imageUrl} alt={`${shopName} company logo`} />
      <p className='text-[#b3b3b3] leading-6 my-5'>{description}</p>
      <div className='flex gap-5'>
        {/* List Comments */}
        <ul className='text-white border-2 border-[#898989] p-4 w-2/3'>
          {commentsArr.map((cObj) => (
            <li key={cObj.id}>{cObj.comment}</li>
          ))}
        </ul>
        {/* Comments Section */}
        {/* <form
          onSubmit={formik.handleSubmit}
          className='text-center flex flex-col w-1/3 gap-5'
        >
          <input
            className='p-2 text-black bg-gray-200'
            type='text'
            placeholder='Display Name'
            id='displayName'
            onChange={formik.handleChange}
            value={formik.values.displayName}
          />
          <textarea
            className='bg-gray-200 resize-none h-52 p-2'
            name='commentText'
            id='commentText'
            onChange={formik.handleChange}
            value={formik.values.commentText}
            placeholder='Your comment'
          />
          <Button>Comment</Button>
        </form> */}
      </div>
    </div>
  );
}
