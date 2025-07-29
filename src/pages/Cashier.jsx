import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileClock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/cashier/SearchBar';
import PredefinedPriceButtons from '../components/cashier/PredefinedPriceButtons';
import ProductsTable from '../components/cashier/ProductsTable';
import ActionButtons from '../components/cashier/ActionButtons';

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
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetCartHandler={resetCartHandler}
      />

      <PredefinedPriceButtons onAddPrice={addPredefinedPrice} />

      <ProductsTable
        products={filteredProducts}
        onQuantityChange={handleQuantityChange}
        onRemove={removeItem}
      />

      <ActionButtons
        total={total}
        onSellWithReceipt={() => setIsReceipt(true)}
        onSellWithoutReceipt={() => setIsReceipt(false)}
        onRefund={() => alert(t('refundAlert'))}
      />

      {isReceipt && (
        <div className='mt-6 text-center'>
          <p className='text-lg font-semibold'>{t('receiptGenerated')}</p>
        </div>
      )}
    </div>
  );
};

export default Cashier;
