const ProductsTable = ({ items, openModal }) => {
  return (
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
          {items.map((item) => (
            <tr
              key={item.id}
              className='border-b border-gray-200 dark:border-blue-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
              onClick={() => openModal(item)}
            >
              <td className='px-4 py-4'>{item.id}</td>
              <td className='px-4 py-4'>{item.name}</td>
              <td className='px-4 py-4'>{item.upc}</td>
              <td className='px-4 py-4'>{item.manufactureDate}</td>
              <td className='px-4 py-4'>{item.expiryDate}</td>
              <td className='px-4 py-4'>{item.quantity}</td>
              <td className='px-4 py-4'>${item.wholesalePrice.toFixed(2)}</td>
              <td className='px-4 py-4'>${item.salePrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
