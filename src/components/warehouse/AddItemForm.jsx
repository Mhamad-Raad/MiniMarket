import { useState } from 'react';
import { addNewItem } from '../../utils/FetchData';
import Toast from '../Toast';

const AddItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    upc: '',
    quantity: '',
    wholesalePrice: '',
    salePrice: '',
    manufactureDate: '',
    expiryDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(newItem)) {
      if (!value || value.trim() === '') {
        setError(
          `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const itemWithId = {
        ...newItem,
        id: `W${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        quantity: Number(newItem.quantity),
        wholesalePrice: Number(newItem.wholesalePrice),
        salePrice: Number(newItem.salePrice),
      };

      const addedItem = await addNewItem(itemWithId);

      if (!addedItem) {
        throw new Error('Failed to add item');
      }

      onAddItem(addedItem);
      setNewItem({
        name: '',
        upc: '',
        quantity: '',
        wholesalePrice: '',
        salePrice: '',
        manufactureDate: '',
        expiryDate: '',
      });
      setError(null);
      showToast('Item added successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center mt-6'>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ show: false, message: '', type: 'success' })
          }
        />
      )}

      <h3 className='text-xl font-bold mb-6 dark:text-white'>Add New Item</h3>

      {error && (
        <div className='w-full max-w-2xl mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 text-sm'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-4'>
        <div className='grid grid-cols-[200px_1fr] gap-4 items-center'>
          <label className='font-medium text-gray-700 dark:text-gray-200'>
            UPC:
          </label>
          <input
            type='text'
            value={newItem.upc}
            onChange={(e) => setNewItem({ ...newItem, upc: e.target.value })}
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />
          
          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Name:
          </label>
          <input
            type='text'
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />

          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Quantity:
          </label>
          <input
            type='number'
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />

          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Wholesale Price:
          </label>
          <input
            type='number'
            step='0.01'
            value={newItem.wholesalePrice}
            onChange={(e) =>
              setNewItem({ ...newItem, wholesalePrice: e.target.value })
            }
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />

          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Sale Price:
          </label>
          <input
            type='number'
            step='0.01'
            value={newItem.salePrice}
            onChange={(e) =>
              setNewItem({ ...newItem, salePrice: e.target.value })
            }
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />

          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Manufacture Date:
          </label>
          <input
            type='date'
            value={newItem.manufactureDate}
            onChange={(e) =>
              setNewItem({ ...newItem, manufactureDate: e.target.value })
            }
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />

          <label className='font-medium text-gray-700 dark:text-gray-200'>
            Expiry Date:
          </label>
          <input
            type='date'
            value={newItem.expiryDate}
            onChange={(e) =>
              setNewItem({ ...newItem, expiryDate: e.target.value })
            }
            className='p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
            required
          />
        </div>

        <div className='flex justify-center mt-8'>
          <button
            type='submit'
            disabled={loading}
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
          >
            {loading ? (
              <>
                <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Adding...
              </>
            ) : (
              'Add Item'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
