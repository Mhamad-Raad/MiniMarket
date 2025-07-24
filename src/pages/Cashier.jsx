import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, Trash, ListRestart, FileClock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cashier = () => {
  const { t } = useTranslation();

  const initialProducts = [
    { name: 'Apple', upc: '1234567890', price: 2.5, quantity: 2 },
    { name: 'Banana', upc: '2345678901', price: 1.8, quantity: 3 },
    { name: 'Orange', upc: '3456789012', price: 3.0, quantity: 1 },
    { name: 'Grapes', upc: '4567890123', price: 4.0, quantity: 4 },
    { name: 'Watermelon', upc: '5678901234', price: 5.0, quantity: 2 },
    { name: 'Pineapple', upc: '6789012345', price: 6.0, quantity: 1 },
    { name: 'Peach', upc: '7890123456', price: 2.0, quantity: 3 },
    { name: 'Peach', upc: '7890123456', price: 2.0, quantity: 3 },
    { name: 'Peach', upc: '7890123456', price: 2.0, quantity: 3 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReceipt, setIsReceipt] = useState(false);

  const total = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const increaseQuantity = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity += 1;
    setProducts(updatedProducts);
  };

  const decreaseQuantity = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity -= 1;
      setProducts(updatedProducts);
    }
  };

  const handleQuantityChange = (e, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(e.target.value, 10) || 0;
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.upc.includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetCartHandler = () => {
    setProducts([]);
  };

  const removeItem = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const addPredefinedPrice = (amount) => {
    setProducts([
      ...products,
      {
        name: `Custom Price - $${amount}`,
        upc: 'N/A',
        price: amount,
        quantity: 1,
      },
    ]);
  };

  return (
    <div className='p-4'>
      <div className='mb-6 flex items-center gap-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-3 rounded-md bg-surface dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary'
          placeholder={t('searchProduct')}
        />
        <Link
          to='/transaction-history'
          className='px-6 py-3 flex flex-col items-center justify-center bg-primary text-white rounded-lg hover:bg-gray-800'
        >
          History
          <p>
            <FileClock />
          </p>
        </Link>
        <button
          className='px-6 py-3 flex flex-col items-center justify-center bg-primary text-white rounded-lg hover:bg-gray-800'
          onClick={resetCartHandler}
        >
          <p>{t('resetCart')}</p>
          <p>
            <ListRestart />
          </p>
        </button>
      </div>

      <div className='flex items-center justify-center text-xl font-bold gap-6 mb-6'>
        {/* Predefined Price Buttons */}
        <button
          className='px-7 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
          onClick={() => addPredefinedPrice(250)}
        >
          $250
        </button>
        <button
          className='px-7 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
          onClick={() => addPredefinedPrice(500)}
        >
          $500
        </button>
        <button
          className='px-7 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
          onClick={() => addPredefinedPrice(1000)}
        >
          $1000
        </button>
        <button
          className='px-7 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
          onClick={() => addPredefinedPrice(2000)}
        >
          $2000
        </button>
      </div>

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
                <th className='px-4 py-2 text-left'>{t('actions')}</th>{' '}
              </tr>
            </thead>
            <tbody className=''>
              {filteredProducts.map((product, index) => (
                <tr
                  key={index}
                  className='border-b border-gray-200 dark:border-blue-400'
                >
                  <td className='px-4 py-4'>{product.name}</td>
                  <td className='px-4 py-4'>${product.price.toFixed(2)}</td>
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
                        onChange={(e) => handleQuantityChange(e, index)}
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
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className='px-4 py-4'>{product.upc}</td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => removeItem(index)}
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

      <div className='mt-12 flex justify-between items-center text-4xl font-bold'>
        <span>{t('totalAmount')}:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      {/* make a refund button */}
      <div className='mt-8 flex justify-between gap-4'>
        <button
          onClick={() => alert(t('refundAlert'))}
          className='px-6 py-4 bg-red text-white rounded-lg hover:bg-red-700'
        >
          {t('refund')}
        </button>
        <div className='flex gap-4'>
          <button
            className='px-6 py-4 bg-primary text-white rounded-lg hover:bg-blue-700'
            onClick={() => setIsReceipt(true)}
          >
            {t('sellWithReceipt')}
          </button>
          <button
            className='px-6 py-4 bg-green text-white rounded-lg hover:bg-gray-700'
            onClick={() => setIsReceipt(false)}
          >
            {t('sellWithoutReceipt')}
          </button>
        </div>
      </div>

      {isReceipt && (
        <div className='mt-6 text-center'>
          <p className='text-lg font-semibold'>{t('receiptGenerated')}</p>
        </div>
      )}
    </div>
  );
};

export default Cashier;

// add warehouse update and delete functgionality
// change the postion of the upc
