import { IoSadOutline } from 'react-icons/io5';
export default function NotFoundPage() {
  return (
    <div className='container my-auto'>
      <div className='flex flex-col gap-8 text-neutral-400 items-center py-20'>
        <IoSadOutline size={200} />
        <h1 className='text-5xl font-semibold'>404</h1>
        <h3 className='text-2xl font-semibold'>Page not Found</h3>
        <p>
          The Page you are looking for doesn&apos;t exist or an other error
          occurred.
        </p>
      </div>
    </div>
  );
}
