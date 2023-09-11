export default function SingleShop(props) {
  const { imageUrl, shopName, description } = props.list;
  return (
    <>
      <li className='bg-[#1f1f1f] rounded-lg overflow-hidden group'>
        <div className='w-full overflow-hidden'>
          <img
            className='w-full object-cover aspect-[6/5] group-hover:scale-110 transition duration-700'
            src={imageUrl}
            alt={shopName}
          />
        </div>
        <div className='p-5 min-h-fit'>
          <h2 className='mt-[10px] mb-[15px] uppercase text-lg text-orange-600 duration-200 hover:text-[#d1310a] inline-block font-bold'>
            {shopName}
          </h2>
          <h4 className='text-white w-full duration-200 hover:text-orange-600 inline-block text-sm font-bold max-h-28 overflow-hidden truncate hover:text-ellipsis'>
            {description}
          </h4>
        </div>
      </li>
    </>
  );
}
