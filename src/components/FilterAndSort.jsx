export default function FilterAndSort({
  sortBy,
  handleSortChange,
  searchVal,
  handleSearch,
  handleSearchFilter,
}) {
  return (
    <div className='w-full mt-1 mb-3 flex gap-1 transition-all duration-400'>
      <input
        onChange={handleSearch}
        value={searchVal}
        type='text'
        placeholder='search'
        className='w-full h-7 py-1 px-2 text-sm text-neutral-400 rounded-l-sm'
      />
      <button
        onClick={handleSearchFilter}
        className='w-fit bg-orange-600 px-4 mx-2 text-white pb-[2px]'
      >
        Search
      </button>
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
  );
}
