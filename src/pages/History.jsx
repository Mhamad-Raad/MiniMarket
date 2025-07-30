import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileClock, ChevronLeft } from 'lucide-react';
import { fetchHistory } from '../utils/FetchData';

const TransactionHistory = () => {
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const data = await fetchHistory();
        const formatted = data.map((tx) => ({
          id: tx.receiptId || tx.id,
          total: tx.total || 0,
          date: tx.saleDate || new Date().toISOString(),
          items:
            tx.items?.map((item, i) => ({
              id: `${tx.receiptId}-${i}`,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })) || [],
        }));
        setTransactions(formatted);
        setFilteredTransactions(formatted);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
      setLoading(false);
    };
    loadHistory();
  }, []);

  useEffect(() => {
    let filtered = transactions;
    if (filterDate) {
      filtered = filtered.filter((transaction) =>
        transaction.date.includes(filterDate)
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredTransactions(filtered);
  }, [searchTerm, filterDate, transactions]);

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeTransactionModal = () => {
    setSelectedTransaction(null);
  };

  const resetFilters = () => {
    setFilterDate('');
    setSearchTerm('');
    setFilteredTransactions(transactions);
  };

  return (
    <div className='p-4'>
      <div className='flex items-center justify-between gap-4 mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {t('transactionHistory')}
        </h2>
        <div className='w-full flex gap-4'>
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
            onClick={() => setFilteredTransactions(transactions)}
            className='px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700'
          >
            <FileClock /> {t('filterByDate')}
          </button>
          <button
            onClick={resetFilters}
            className='px-6 py-2 bg-red text-white rounded-lg'
          >
            {t('resetFilters')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className='text-center py-20 text-lg font-bold text-gray-600 dark:text-gray-300'>
          {t('loading')}...
        </div>
      ) : (
        <div className='overflow-x-auto shadow-md sm:rounded-lg dark:shadow-lg'>
          <div className='max-h-[650px] overflow-y-auto'>
            <table className='min-w-full'>
              <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0 z-10'>
                <tr>
                  <th className='px-4 py-2 text-left'>{t('transactionId')}</th>
                  <th className='px-4 py-2 text-left'>{t('totalPrice')}</th>
                  <th className='px-4 py-2 text-left'>{t('date')}</th>
                  <th className='px-4 py-2 text-left'>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className='border-b border-gray-200 dark:border-blue-400'
                  >
                    <td className='px-4 py-4'>{transaction.id}</td>
                    <td className='px-4 py-4'>
                      ${transaction.total.toFixed(2)}
                    </td>
                    <td className='px-4 py-4'>
                      {new Date(transaction.date).toLocaleString()}
                    </td>
                    <td className='px-4 py-2'>
                      <button
                        onClick={() => openTransactionModal(transaction)}
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
                      >
                        {t('viewDetails')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className='flex justify-center my-8'>
        <Link
          to='/'
          className='px-6 py-3 flex items-center gap-2 bg-primary text-white rounded-lg hover:bg-blue-700 font-bold text-lg transition'
        >
          <ChevronLeft />
          <p>{t('backToCashier')}</p>
        </Link>
      </div>

      {selectedTransaction && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={closeTransactionModal}
        >
          <div
            className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='text-2xl font-extrabold mb-6 text-primary dark:text-blue-400 text-center'>
              {t('transactionDetails')}
            </h3>
            <div className='mb-4 flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700 dark:text-blue-300'>
                  {t('transactionId')}:
                </span>
                <span className='px-2 py-1 rounded bg-primary/10 dark:bg-blue-900/40 text-primary dark:text-blue-400 font-mono font-bold'>
                  {selectedTransaction.id}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700 dark:text-blue-300'>
                  {t('totalPrice')}:
                </span>
                <span className='px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-bold'>
                  ${selectedTransaction.total.toFixed(2)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-gray-700 dark:text-blue-300'>
                  {t('date')}:
                </span>
                <span className='px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold'>
                  {new Date(selectedTransaction.date).toLocaleString()}
                </span>
              </div>
            </div>
            <h4 className='mt-6 mb-2 font-bold text-lg text-primary dark:text-blue-400 border-b border-gray-300 dark:border-gray-700 pb-2'>
              {t('itemsSold')}
            </h4>
            <ul className='max-h-[200px] overflow-y-auto mb-4 pr-2'>
              {selectedTransaction.items.map((item) => (
                <li
                  key={item.id}
                  className='flex justify-between items-center py-2 px-3 mb-2 rounded bg-gray-100 dark:bg-gray-800 shadow-sm'
                >
                  <span className='font-semibold text-gray-900 dark:text-white'>
                    {item.name}
                  </span>
                  <span className='text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-mono'>
                    x{item.quantity}
                  </span>
                  <span className='text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-mono'>
                    ${item.price.toFixed(2)}
                  </span>
                  <span className='text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono'>
                    ID: {item.id}
                  </span>
                </li>
              ))}
            </ul>
            <div className='mt-4 flex justify-end gap-4'>
              <button
                onClick={closeTransactionModal}
                className='px-6 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800'
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
