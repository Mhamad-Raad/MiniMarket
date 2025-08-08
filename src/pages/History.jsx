import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import { fetchHistory } from '../utils/FetchData';
import TransactionFilters from '../components/History/TransactionFilters';
import TransactionTable from '../components/History/TransactionTable';
import TransactionModal from '../components/History/TransactionModal';

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
          id: tx.receiptId || tx.id || 'N/A',
          total: tx.total || 0,
          date: tx.saleDate || new Date().toISOString(),
          items: Array.isArray(tx.items)
            ? tx.items.map((item, i) => ({
                id: `${tx.receiptId || 'TX'}-${i}`,
                name: item.name || 'Unknown',
                price: item.price || 0,
                quantity: item.quantity || 0,
              }))
            : [],
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

  const openTransactionModal = (transaction) =>
    setSelectedTransaction(transaction);
  const closeTransactionModal = () => setSelectedTransaction(null);
  const resetFilters = () => {
    setFilterDate('');
    setSearchTerm('');
    setFilteredTransactions(transactions);
  };

  return (
    <div className='p-4'>
      <TransactionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        onReset={resetFilters}
        t={t}
      />

      {loading ? (
        <div className='text-center py-20 text-lg font-bold text-gray-600 dark:text-gray-300'>
          {t('loading')}...
        </div>
      ) : (
        <TransactionTable
          transactions={filteredTransactions}
          onView={openTransactionModal}
          t={t}
        />
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

      <TransactionModal
        transaction={selectedTransaction}
        onClose={closeTransactionModal}
        t={t}
      />
    </div>
  );
};

export default TransactionHistory;
