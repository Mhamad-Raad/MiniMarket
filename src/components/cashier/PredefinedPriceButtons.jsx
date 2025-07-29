const PredefinedPriceButtons = ({ onAddPrice }) => {
  const prices = [250, 500, 1000, 2000];

  return (
    <div className='flex items-center justify-center text-xl font-bold gap-6 mb-6'>
      {prices.map((price) => (
        <button
          key={price}
          className='px-7 py-5 bg-blue-500 text-white rounded-lg hover:bg-blue-700'
          onClick={() => onAddPrice(price)}
        >
          ${price}
        </button>
      ))}
    </div>
  );
};

export default PredefinedPriceButtons;
