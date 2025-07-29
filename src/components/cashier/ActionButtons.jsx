import { useTranslation } from 'react-i18next';

const ActionButtons = ({
  total,
  onSellWithReceipt,
  onSellWithoutReceipt,
  onRefund,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='mt-12 flex justify-between items-center text-4xl font-bold'>
        <span>{t('totalAmount')}:</span>
        <span>{`${total} IQD`}</span>
      </div>
      <div className='mt-8 flex justify-between gap-4'>
        <button
          onClick={onRefund}
          className='px-6 py-4 bg-red text-white rounded-lg hover:bg-red-700'
        >
          {t('refund')}
        </button>
        <div className='flex gap-4'>
          <button
            className='px-6 py-4 bg-primary text-white rounded-lg hover:bg-blue-700'
            onClick={onSellWithReceipt}
          >
            {t('sellWithReceipt')}
          </button>
          <button
            className='px-6 py-4 bg-green text-white rounded-lg hover:bg-gray-700'
            onClick={onSellWithoutReceipt}
          >
            {t('sellWithoutReceipt')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ActionButtons;
