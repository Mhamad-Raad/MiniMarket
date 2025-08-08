const TransactionFilters = ({
  searchTerm,
  setSearchTerm,
  filterDate,
  setFilterDate,
  onReset,
  t,
}) => {
  return (
    <div className='w-full flex gap-4 mb-6'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary'
        placeholder={t('searchByTransactionId')}
      />
      <input
        type='date'
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary'
      />

      <button
        onClick={onReset}
        className='px-6 py-2 bg-red text-white rounded-lg'
      >
        {t('resetFilters')}
      </button>
    </div>
  );
};

export default TransactionFilters;
