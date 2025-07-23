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
                  className='border-b border-gray-200 dark:border-blue-400'
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
            <div className='mb-4 flex items-center'>
              <label
                htmlFor='itemName'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Item Name:
              </label>
              <input
                id='itemName'
                type='text'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='upc'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                UPC:
              </label>
              <input
                id='upc'
                type='text'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='quantity'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Quantity:
              </label>
              <input
                id='quantity'
                type='number'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='wholesalePrice'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Wholesale Price:
              </label>
              <input
                id='wholesalePrice'
                type='number'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='salePrice'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Sale Price:
              </label>
              <input
                id='salePrice'
                type='number'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='manufactureDate'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Manufacture Date:
              </label>
              <input
                id='manufactureDate'
                type='date'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <label
                htmlFor='expiryDate'
                className='block text-gray-900 dark:text-white mr-4 w-[175px]'
              >
                Expiry Date:
              </label>
              <input
                id='expiryDate'
                type='date'
                className='p-2 w-full rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              />
            </div>

            <button
              type='submit'
              className='px-6 py-4 mx-auto mt-[20px] w-[200px] bg-green text-white rounded-lg'
            >
              Add Item
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
