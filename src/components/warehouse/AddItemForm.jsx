import { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      ...newItem,
      id: `W${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    });
    setNewItem({
      name: '',
      upc: '',
      quantity: '',
      wholesalePrice: '',
      salePrice: '',
      manufactureDate: '',
      expiryDate: '',
    });
  };

  return (
    <div className='flex flex-col justify-center items-center mt-6'>
      <h3 className='text-xl font-bold mb-10 dark:text-white'>Add New Item</h3>
      <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-4'>
        <div className='grid grid-cols-[200px_1fr] gap-4 items-center'>
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
            className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mt-4 font-semibold'
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
