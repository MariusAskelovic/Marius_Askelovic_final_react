import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';

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
          <li
            key={sObj.id}
            className='bg-[#1f1f1f] rounded-lg overflow-hidden group'
          >
            <div className='w-full overflow-hidden'>
              <img
                className='w-full object-cover aspect-[6/5] group-hover:scale-110 transition duration-700'
                src={sObj.imageUrl}
                alt={sObj.shopName}
              />
            </div>
            <div className='p-5 min-h-fit'>
              <h2 className='mt-[10px] mb-[15px] uppercase text-lg text-orange-600 duration-200 hover:text-[#d1310a] inline-block font-bold'>
                {sObj.shopName}
              </h2>
              <h4 className='text-white w-full duration-200 hover:text-orange-600 inline-block text-sm font-bold max-h-28 overflow-hidden truncate hover:text-ellipsis'>
                {sObj.description}
              </h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
