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
      <ul>
        {dbData.map((sObj) => (
          <li key={sObj.id}>
            <img
              className='h-[200px] w-full object-cover'
              src={sObj.imageUrl}
              alt={sObj.shopName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
