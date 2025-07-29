const ProductModal = ({
  currentItem,
  setCurrentItem,
  handleUpdate,
  handleDelete,
  closeModal,
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
          {/* ... existing form fields ... */}
          <div className='flex flex-col sm:flex-row gap-3 justify-between'>
            <button
              type='button'
              onClick={handleUpdate}
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition'
            >
              Update Product
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold transition'
            >
              Delete Product
            </button>
            <button
              type='button'
              onClick={closeModal}
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-semibold transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100'
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
