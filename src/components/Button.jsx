export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className='py-1 px-10 bg-white rounded-sm hover:bg-orange-600 transition hover:duration-300 text-black'
      type='submit'
    >
      {props.children}
    </button>
  );
}
