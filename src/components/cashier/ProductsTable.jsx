import { Plus, Minus, Trash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductsTable = ({ products, onQuantityChange, onRemove }) => {
  const { t } = useTranslation();

  const increaseQuantity = (index) => {
    onQuantityChange(index, products[index].quantity + 1);
  };

  const decreaseQuantity = (index) => {
    if (products[index].quantity > 0) {
      onQuantityChange(index, products[index].quantity - 1);
    }
  };

  const handleQuantityInputChange = (e, index) => {
    onQuantityChange(index, parseInt(e.target.value, 10) || 0);
  };

  return (
    <div className='overflow-x-auto shadow-md sm:rounded-lg dark:shadow-lg dark:shadow-blue-400'>
      <div className='h-[480px] overflow-y-auto'>
        <table className='min-w-full'>
          <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0 z-10'>
            <tr>
              <th className='px-4 py-2 text-left'>{t('productName')}</th>
              <th className='px-4 py-2 text-left'>{t('price')}</th>
              <th className='px-4 py-2 text-left'>{t('quantity')}</th>
              <th className='px-4 py-2 text-left'>{t('total')}</th>
              <th className='px-4 py-2 text-left'>{t('upc')}</th>
              <th className='px-4 py-2 text-left'>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className='border-b border-gray-200 dark:border-blue-400'
              >
                <td className='px-4 py-4'>{product.name}</td>
                <td className='px-4 py-4'>{`${product.price} IQD`}</td>
                <td className='px-4 py-4'>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => decreaseQuantity(index)}
                      className='px-4 py-2 bg-red text-white rounded-lg hover:bg-red-700'
                    >
                      <Minus />
                    </button>
                    <input
                      type='number'
                      value={product.quantity}
                      onChange={(e) => handleQuantityInputChange(e, index)}
                      className='w-24 p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                    />
                    <button
                      onClick={() => increaseQuantity(index)}
                      className='px-4 py-2 bg-green text-white rounded-lg hover:bg-green-700'
                    >
                      <Plus />
                    </button>
                  </div>
                </td>
                <td className='px-4 py-2'>
                  {`${(product.price * product.quantity)} IQD`}
                </td>
                <td className='px-4 py-4'>{product.upc}</td>
                <td className='px-4 py-2'>
                  <button
                    onClick={() => onRemove(index)}
                    className='px-4 py-2 bg-red-500 text-white rounded-lg bg-red'
                  >
                    <Trash />
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

export default ProductsTable;
