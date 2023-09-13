export default function Button(props) {
  return (
    <button
      className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300 text-black mb-2'
      type='submit'
    >
      {props.children}
    </button>
  );
}
