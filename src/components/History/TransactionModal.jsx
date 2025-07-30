const TransactionModal = ({ transaction, onClose, t }) => {
  if (!transaction) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
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
              {transaction.id}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700 dark:text-blue-300'>
              {t('totalPrice')}:
            </span>
            <span className='px-2 py-1 rounded bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 font-bold'>
              ${transaction.total.toFixed(2)}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='font-semibold text-gray-700 dark:text-blue-300'>
              {t('date')}:
            </span>
            <span className='px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold'>
              {new Date(transaction.date).toLocaleString()}
            </span>
          </div>
        </div>

        <h4 className='mt-6 mb-2 font-bold text-lg text-primary dark:text-blue-400 border-b border-gray-300 dark:border-gray-700 pb-2'>
          {t('itemsSold')}
        </h4>

        <ul className='max-h-[200px] overflow-y-auto mb-4 pr-2'>
          {transaction.items.map((item) => (
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
            onClick={onClose}
            className='px-6 py-2 bg-gray-500 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800'
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
