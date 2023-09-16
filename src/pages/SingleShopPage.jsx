import { useNavigate, useParams } from 'react-router-dom';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
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
    });
    setCommentsArr(comments);
  }
  const currentDate = new Date();
  const timestamp = Timestamp.fromDate(currentDate);
  const initialValues = {
    displayName: '',
    commentText: '',
    date: timestamp,
    userId: ctx.userId,
  };
  // const validationSchema = Yup.object({});
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema,
    onSubmit: (values) => {
      console.log('values ===', values);
      const valWithUserId = { userId: ctx.userId, ...values };
      addDocumentToSubcollection(valWithUserId);
    },
  });
  async function addDocumentToSubcollection(newComment) {
    const shopsRef = collection(db, 'shops');
    const specificShopRef = doc(shopsRef, params.shopId);
    const commentsSubColRef = collection(specificShopRef, 'comments');
    try {
      const docRef = await addDoc(commentsSubColRef, newComment);
      setCommentsArr((prevComments) => [
        ...prevComments,
        { id: docRef.id, userId: ctx.userId, ...newComment },
      ]);
      console.log('Document added to subcollection successfully');
      formik.handleReset();
    } catch (error) {
      console.error('Error adding document to subcollection: ', error);
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
      <div className='flex gap-8 flex-col-reverse sm:flex-row'>
        <ul className='text-white w-full sm:w-2/3 h-fit flex flex-col gap-3'>
          {commentsArr.map((cObj) => {
            const formattedDate = cObj.date.toDate().toLocaleDateString();
            const isOwner = cObj?.userId === ctx.userId ? true : false;
            return (
              <li
                key={cObj.id}
                className='border-b-4 border-neutral-500 p-3 rounded-sm'
              >
                <div className='flex justify-between mb-1 items-center'>
                  <h3 className='py-1 px-3 bg-white rounded-sm text-black inline-block'>
                    {cObj.displayName}
                  </h3>
                  <p className='text-neutral-200 text-sm'>{formattedDate}</p>
                </div>
                <h4 className='py-1'>{cObj.commentText}</h4>
                {isOwner && <button>X</button>}
              </li>
            );
          })}
        </ul>
        <form
          onSubmit={formik.handleSubmit}
          className='text-center flex flex-col w-full sm:w-1/3 gap-5'
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
            className='bg-gray-200 resize-none h-36 p-2'
            name='commentText'
            id='commentText'
            onChange={formik.handleChange}
            value={formik.values.commentText}
            placeholder='Your comment'
          />
          <input
            type='hidden'
            name='date'
            id='date'
            value={formik.values.date.toDate()}
          />
          <Button>Comment</Button>
        </form>
      </div>
    </div>
  );
}
