import { FileClock, ListRestart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  resetCartHandler,
  handleSearchChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className='mb-6 flex items-center gap-4'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => handleSearchChange(e)} // Use the passed down handler
        className='w-full p-3 rounded-md bg-surface dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary'
        placeholder={t('searchProduct')}
      />
      <Link
        to='/transaction-history'
        className='px-6 py-3 flex flex-col items-center justify-center bg-primary text-white rounded-lg hover:bg-gray-800'
      >
        History
        <FileClock />
      </Link>
      <button
        className='px-6 py-3 flex flex-col items-center justify-center bg-primary text-white rounded-lg hover:bg-gray-800'
        onClick={resetCartHandler}
      >
        <p>{t('resetCart')}</p>
        <ListRestart />
      </button>
    </div>
  );
};

export default SearchBar;
