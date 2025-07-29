const WarehouseNav = ({
  selectedPage,
  handlePageChange,
  searchTerm,
  setSearchTerm,
  filterDate,
  setFilterDate,
}) => {
  return (
    <div className='flex items-center justify-between gap-4 mb-6'>
      <div className='flex items-center border-2 border-gray-300 dark:border-blue-600 rounded-xl font-bold'>
        <button
          onClick={() => handlePageChange(0)}
          className={`h-12 px-3 rounded-tl-xl rounded-bl-xl ${
            selectedPage === 0 && 'bg-blue-500 text-white'
          }`}
        >
          Products
        </button>
        <div className='h-12 w-1 bg-secondary dark:bg-blue-500'></div>
        <button
          onClick={() => handlePageChange(1)}
          className={`w-[100px] h-12 px-3 rounded-tr-xl rounded-br-xl ${
            selectedPage === 1 && 'bg-blue-500 text-white'
          }`}
        >
          Add Item
        </button>
      </div>

      <div className='w-full flex gap-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
          placeholder='Search by Name or UPC'
        />
        <input
          type='date'
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
        />
      </div>
    </div>
  );
};

export default WarehouseNav;
