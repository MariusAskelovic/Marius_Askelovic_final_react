import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import SingleShop from '../components/SingleShop';

export default function Shops() {
  const [dbData, setDbData] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

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

  function toggleMoreOptions() {
    setShowMoreOptions(!showMoreOptions);
  }

  return (
    <div className='container'>
      <SlOptions
        onClick={toggleMoreOptions}
        size={16}
        className='ml-auto mr-1 my-2 text-white hover:text-orange-600 transition duration-200'
      />
      {showMoreOptions && (
        <div className='w-full mt-1 mb-3 flex gap-1 transition-all duration-400'>
          <input
            type='text'
            placeholder='search'
            className='w-full h-7 py-1 px-2 text-sm text-neutral-400 rounded-l-sm'
          />
          <select className='w-full h-7 py-1 px-2 text-sm bg-white text-neutral-400 rounded-r-sm'>
            <option value='shopName'>Shop Name (A - Z)</option>
            <option value='shopNameRev'>Shop Name (Z - A)</option>
            <option value='year'>Year (0 - 9)</option>
            <option value='yearRev'>Year (9 - 0)</option>
          </select>
        </div>
      )}
      <ul className='grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3 mb-20'>
        {dbData.map((sObj) => (
          <SingleShop key={sObj.id} list={sObj} />
        ))}
      </ul>
    </div>
  );
}
