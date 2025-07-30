const TransactionTable = ({ transactions, onView, t }) => {
  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg dark:shadow-lg mt-20'>
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className='border-b border-gray-200 dark:border-blue-400'
              >
                <td className='px-4 py-4'>{transaction.id}</td>
                <td className='px-4 py-4'>${transaction.total.toFixed(2)}</td>
                <td className='px-4 py-4'>
                  {new Date(transaction.date).toLocaleString()}
                </td>
                <td className='px-4 py-2'>
                  <button
                    onClick={() => onView(transaction)}
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
  );
};

export default TransactionTable;
