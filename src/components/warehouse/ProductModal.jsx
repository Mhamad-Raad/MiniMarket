const ProductModal = ({
  currentItem,
  setCurrentItem,
  handleUpdate,
  handleDelete,
  closeModal,
  loading,
}) => {
  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={closeModal}
    >
      <div
        className='bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-[98vw] max-w-2xl relative animate-fade-in border border-gray-200 dark:border-gray-700'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className='absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none'
          aria-label='Close'
        >
          &times;
        </button>
        <h3 className='text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400'>
          Update Product
        </h3>
        <form>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              Name
            </label>
            <input
              id='name'
              type='text'
              value={currentItem.name}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, name: e.target.value })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='upc'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              UPC
            </label>
            <input
              id='upc'
              type='text'
              value={currentItem.upc}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, upc: e.target.value })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='quantity'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              Quantity
            </label>
            <input
              id='quantity'
              type='number'
              value={currentItem.quantity}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, quantity: e.target.value })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='wholesalePrice'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              Wholesale Price
            </label>
            <input
              id='wholesalePrice'
              type='number'
              step='0.01'
              value={currentItem.wholesalePrice}
              onChange={(e) =>
                setCurrentItem({
                  ...currentItem,
                  wholesalePrice: e.target.value,
                })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='salePrice'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              Sale Price
            </label>
            <input
              id='salePrice'
              type='number'
              step='0.01'
              value={currentItem.salePrice}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, salePrice: e.target.value })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='mb-6'>
            <label
              htmlFor='expiryDate'
              className='block font-semibold mb-1 dark:text-gray-200'
            >
              Expiry Date
            </label>
            <input
              id='expiryDate'
              type='date'
              value={currentItem.expiryDate}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, expiryDate: e.target.value })
              }
              className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-3 justify-between'>
            <button
              type='button'
              onClick={handleUpdate}
              disabled={loading}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50'
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type='button'
              onClick={handleDelete}
              disabled={loading}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition disabled:opacity-50'
            >
              {loading ? 'Deleting...' : 'Delete Product'}
            </button>
            <button
              type='button'
              onClick={closeModal}
              disabled={loading}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-semibold transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 disabled:opacity-50'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
