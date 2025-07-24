import { useState } from 'react';

const Warehouse = () => {
  const [items, setItems] = useState([
    {
      id: 'W12345',
      name: 'Apple',
      upc: '1234567890',
      quantity: 100,
      wholesalePrice: 1.0,
      salePrice: 1.5,
      manufactureDate: '2023-06-01',
      expiryDate: '2024-06-01',
    },
    {
      id: 'W12346',
      name: 'Banana',
      upc: '2345678901',
      quantity: 150,
      wholesalePrice: 0.8,
      salePrice: 1.2,
      manufactureDate: '2023-05-15',
      expiryDate: '2024-05-15',
    },
  ]);

  const [selectedPage, setSelectedPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const filterItems = () => {
    return items.filter((item) => {
      const matchesName = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesUPC = item.upc.includes(searchTerm);
      const matchesDate =
        filterDate &&
        (item.manufactureDate.includes(filterDate) ||
          item.expiryDate.includes(filterDate));
      return matchesName || matchesUPC || matchesDate;
    });
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const openModal = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleUpdate = () => {
    const updatedItems = items.map((item) =>
      item.id === currentItem.id ? currentItem : item
    );
    setItems(updatedItems);
    closeModal();
  };

  const handleDelete = () => {
    const updatedItems = items.filter((item) => item.id !== currentItem.id);
    setItems(updatedItems);
    closeModal();
  };

  return (
    <div>
      <div className='flex items-center justify-between gap-4 mb-6'>
        <div className='flex items-center border-2 border-gray-300 dark:border-blue-600 rounded-xl font-bold'>
          <button
            onClick={() => handlePageChange(0)}
            className={`h-12 px-3 rounded-tl-xl rounded-bl-xl ${
              selectedPage === 0 && 'bg-blue-500 text-white'
            }`}
          >
            Products
          </button>
          <div className='h-12 w-1 bg-secondary dark:bg-blue-500'></div>
          <button
            onClick={() => handlePageChange(1)}
            className={`w-[100px] h-12 px-3 rounded-tr-xl rounded-br-xl ${
              selectedPage === 1 && 'bg-blue-500 text-white'
            }`}
          >
            Add Item
          </button>
        </div>

        <div className='w-full flex gap-4'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
            placeholder='Search by Name or UPC'
          />
          <input
            type='date'
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className='p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
          />
        </div>
      </div>

      {selectedPage === 0 && (
        <div className='overflow-x-auto shadow-md sm:rounded-lg dark:shadow-blue-400'>
          <table className='min-w-full'>
            <thead className='bg-gray-100 dark:bg-gray-700 sticky top-0 z-10'>
              <tr>
                <th className='px-4 py-2 text-left'>ID</th>
                <th className='px-4 py-2 text-left'>Name</th>
                <th className='px-4 py-2 text-left'>UPC</th>
                <th className='px-4 py-2 text-left'>Manufacture Date</th>
                <th className='px-4 py-2 text-left'>Expiry Date</th>
                <th className='px-4 py-2 text-left'>Quantity</th>
                <th className='px-4 py-2 text-left'>Wholesale Price</th>
                <th className='px-4 py-2 text-left'>Sale Price</th>
              </tr>
            </thead>
            <tbody>
              {filterItems().map((item) => (
                <tr
                  key={item.id}
                  className='border-b border-gray-200 dark:border-blue-400 cursor-pointer'
                  onClick={() => openModal(item)}
                >
                  <td className='px-4 py-4'>{item.id}</td>
                  <td className='px-4 py-4'>{item.name}</td>
                  <td className='px-4 py-4'>{item.upc}</td>
                  <td className='px-4 py-4'>{item.manufactureDate}</td>
                  <td className='px-4 py-4'>{item.expiryDate}</td>
                  <td className='px-4 py-4'>{item.quantity}</td>
                  <td className='px-4 py-4'>
                    ${item.wholesalePrice.toFixed(2)}
                  </td>
                  <td className='px-4 py-4'>${item.salePrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedPage === 1 && (
        <div className='flex flex-col justify-center items-center mt-6'>
          <h3 className='text-xl font-bold mb-10'>Add New Item</h3>
          <form className='w-full flex flex-col max-w-2xl'>
            <button
              type='submit'
              className='px-6 py-4 mx-auto mt-[20px] w-[200px] bg-green text-white rounded-lg'
            >
              Add Item
            </button>
          </form>
        </div>
      )}

      {showModal && currentItem && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={closeModal}
        >
          <div
            className='bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-[98vw] max-w-2xl relative animate-fade-in border border-gray-200 dark:border-gray-700'
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
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
                  value={currentItem.salePrice}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      salePrice: e.target.value,
                    })
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
                    setCurrentItem({
                      ...currentItem,
                      expiryDate: e.target.value,
                    })
                  }
                  className='p-2 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-blue-500'
                />
              </div>
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
      )}
    </div>
  );
};

export default Warehouse;
