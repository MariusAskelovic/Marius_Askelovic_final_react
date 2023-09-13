import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function SingleShopPage() {
  const params = useParams();
  const [shopData, setShopData] = useState({});
  useEffect(() => {
    getData();
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
      <p className='text-[#898989] leading-6 my-5'>{description}</p>
    </div>
  );
}
