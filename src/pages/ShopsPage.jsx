import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { SlOptions } from 'react-icons/sl';
import SingleShop from '../components/SingleShop';
import FilterAndSort from '../components/FilterAndSort';

export default function ShopsPage() {
  const [dbData, setDbData] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [sortBy, setSortBy] = useState('shopName');
  const [searchVal, setSearchVal] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    // setShowMoreOptions(window.innerWidth < 640 ? !showMoreOptions : false);
    setShowMoreOptions(!showMoreOptions);
  }

  function handleSortChange(event) {
    setSortBy(event.target.value);
  }

  useEffect(() => {
    setFilteredData(dbData);
    let sortedData = [...dbData];
    switch (sortBy) {
      case 'shopName':
        sortedData.sort((aObj, bObj) =>
          aObj.shopName.localeCompare(bObj.shopName)
        );
        break;
      case 'shopNameRev':
        sortedData.sort((aObj, bObj) =>
          bObj.shopName.localeCompare(aObj.shopName)
        );
        break;
      case 'year':
        sortedData.sort((aObj, bObj) =>
          aObj.startYear.toString().localeCompare(bObj.startYear)
        );
        break;
      case 'yearRev':
        sortedData.sort((aObj, bObj) =>
          bObj.startYear.toString().localeCompare(aObj.startYear)
        );
        break;
      default:
        sortedData = [...dbData];
        break;
    }
    setFilteredData(sortedData);
  }, [sortBy, dbData]);

  function handleSearch(event) {
    setSearchVal(event.target.value);
  }

  function handleSearchFilter() {
    const newArr = dbData.filter((shopObj) =>
      shopObj.shopName.toUpperCase().includes(searchVal.toUpperCase())
    );
    setFilteredData(newArr);
  }

  return (
    <div className='container'>
      <SlOptions
        onClick={toggleMoreOptions}
        size={16}
        className='ml-auto mr-1 my-2 text-white hover:text-orange-600 transition duration-200'
      />
      {showMoreOptions && (
        <FilterAndSort
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          searchVal={searchVal}
          handleSearch={handleSearch}
          handleSearchFilter={handleSearchFilter}
        />
      )}
      <ul className='grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3 mb-20 transition-all duration-2000'>
        {filteredData.map((sObj) => (
          <SingleShop key={sObj.id} list={sObj} />
        ))}
      </ul>
    </div>
  );
}
