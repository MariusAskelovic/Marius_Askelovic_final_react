import { Link } from 'react-router-dom';

export default function SingleShop(props) {
  const { imageUrl, shopName, description, startYear, id } = props.list;
  return (
    <>
      <li className='bg-[#1f1f1f] rounded-lg overflow-hidden group transition-all duration-300'>
        <Link to={`/shop/${id}`}>
          <div className='w-full overflow-hidden relative'>
            <img
              className='w-full object-cover aspect-[6/5] group-hover:scale-110 transition duration-700'
              src={imageUrl}
              alt={shopName}
            />
            <h3 className='absolute -top-[2px] -right-[2px] py-1 px-2 bg-orange-600 text-white opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-1000 font-semibold text-sm'>
              {startYear}
            </h3>
          </div>
          <div className='p-5 min-h-fit'>
            <h2 className='mt-[10px] mb-[15px] uppercase text-lg text-orange-600 transition duration-200 hover:text-[#d1310a] inline-block font-bold'>
              {shopName}
            </h2>

            <h4 className='text-white w-full duration-200 hover:text-orange-600 inline-block text-sm font-bold max-h-28 overflow-hidden truncate hover:text-ellipsis'>
              {description}
            </h4>
          </div>
        </Link>
      </li>
    </>
  );
}
