import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import SingleShop from '../components/SingleShop';

export default function Shops() {
  const [dbData, setDbData] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [sortBy, setSortBy] = useState('shopName');

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

  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  useEffect(() => {
    let sortedData = [...dbData];
    switch (sortBy) {
      case 'shopName':
        sortedData.sort((aObj, bObj) =>
          aObj.shopName.localeCompare(bObj.shopName)
        );
        console.log('A-Z');
        break;
      case 'shopNameRev':
        sortedData.sort((aObj, bObj) =>
          bObj.shopName.localeCompare(aObj.shopName)
        );
        console.log('Z-A');
        break;
      case 'year':
        sortedData.sort((aObj, bObj) =>
          aObj.startYear.toString().localeCompare(bObj.startYear)
        );
        console.log('0-9');
        break;
      case 'yearRev':
        sortedData.sort((aObj, bObj) =>
          bObj.startYear.toString().localeCompare(aObj.startYear)
        );
        console.log('9-0');
        break;
      default:
        sortedData = [...dbData];
        break;
    }
    setDbData(sortedData);
  }, [sortBy]);

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
          <select
            value={sortBy}
            onChange={handleSortChange}
            className='w-full h-7 py-1 px-2 text-sm bg-white text-neutral-400 rounded-r-sm'
          >
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
