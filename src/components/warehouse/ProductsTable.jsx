import { useTranslation } from 'react-i18next';

const ProductsTable = ({ items, openModal, loading }) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className='text-center py-8 text-gray-600 dark:text-gray-400'>
        {t('noProductsFound')}
      </div>
    );
  }

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg dark:shadow-blue-400'>
      <table className='min-w-full'>
        <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0 z-10'>
          <tr>
            <th className='px-4 py-2 text-left'>{t('name')}</th>
            <th className='px-4 py-2 text-left'>{t('upc')}</th>
            <th className='px-4 py-2 text-left'>{t('manufactureDate')}</th>
            <th className='px-4 py-2 text-left'>{t('expiryDate')}</th>
            <th className='px-4 py-2 text-left'>{t('quantity')}</th>
            <th className='px-4 py-2 text-left'>{t('wholesalePrice')}</th>
            <th className='px-4 py-2 text-left'>{t('salePrice')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className='border-b border-gray-200 dark:border-blue-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
              onClick={() => openModal(item)}
            >
              <td className='px-4 py-4'>{item.name}</td>
              <td className='px-4 py-4'>{item.upc}</td>
              <td className='px-4 py-4'>{item.manufactureDate}</td>
              <td className='px-4 py-4'>{item.expiryDate}</td>
              <td className='px-4 py-4'>{item.quantity}</td>
              <td className='px-4 py-4'>{`${item.wholesalePrice} IQD`}</td>
              <td className='px-4 py-4'>{`${item.salePrice} IQD`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
