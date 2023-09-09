import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function Shops() {
  const [dbData, setDbData] = useState([]);

  async function getDbData() {
    const querySnapshot = await getDocs(collection(db, 'shops'));
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    setDbData(tempArr);
  }

  useEffect(() => {
    getDbData();
  }, []);
  return (
    <div className='container'>
      <ul className='grid sm:grid-cols-2 lg:grid-cols-3'>
        {dbData.map((sObj) => (
          <li key={sObj.id} className='bg-stone-900'>
            <img
              className='w-full object-cover aspect-square'
              src={sObj.imageUrl}
              alt={sObj.shopName}
            />
            <div>
              <h4>{sObj.year}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
