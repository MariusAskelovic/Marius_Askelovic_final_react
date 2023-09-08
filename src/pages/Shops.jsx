import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function Shops() {
  const [dbData, setDbData] = useState([]);

  async function getDbData() {
    const querySnapshot = await getDocs(collection(db, 'shops'));
    const tempArr = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tempArr.push(doc.data());
    });
    console.log('tempArr ===', tempArr);
    setDbData(tempArr);
  }

  useEffect(() => {
    getDbData();
  }, []);
  return (
    <div className='container'>
      <ul>
        {dbData.map((sObj) => (
          <li key={sObj.shopName}>
            <img src={sObj.imageUrl} alt='alt' />
          </li>
        ))}
      </ul>
    </div>
  );
}
