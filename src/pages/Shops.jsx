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
          <li
            key={sObj.id}
            className='bg-[#1f1f1f] mb-20 rounded-lg overflow-hidden group'
          >
            <div className='w-full overflow-hidden'>
              <img
                className='w-full object-cover aspect-square group-hover:scale-110 transition duration-700'
                src={sObj.imageUrl}
                alt={sObj.shopName}
              />
            </div>
            <div className='p-[30px] min-h-fit'>
              <h2 className='mt-[10px] mb-[15px] uppercase text-xs text-orange-600'>
                {sObj.shopName}
              </h2>
              <h4 className='text-white truncate w-full'>{sObj.description}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
