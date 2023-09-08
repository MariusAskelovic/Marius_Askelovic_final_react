export default function AddShopPage() {
  return (
    <div className='container'>
      <form className='text-center'>
        <div>
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='Title'
            id='title'
          />
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='Description'
            id='description'
          />
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='Year we started'
            id='year'
          />
          <input
            className='w-full py-1 px-2 mb-2'
            type='text'
            placeholder='City'
            id='city'
          />
          <input
            className='w-full py-1 px-2 mb-3'
            type='text'
            placeholder='TrustPilot link'
            id='trustpilotURL'
          />
        </div>
        <button
          className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300'
          type='submit'
        >
          Create
        </button>
      </form>
    </div>
  );
}
