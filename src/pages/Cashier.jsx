import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import { Plus, Minus, Trash } from 'lucide-react';

import SearchBar from '../components/cashier/SearchBar';
import PredefinedPriceButtons from '../components/cashier/PredefinedPriceButtons';
import ProductsTable from '../components/cashier/ProductsTable';
import ActionButtons from '../components/cashier/ActionButtons';
import { generateReceipt, printReceipt } from '../utils/receiptGenerator';
import { addHistory, processRefund, getProducts } from '../utils/FetchData';

const Cashier = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isReceipt, setIsReceipt] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('Fetched products:', products);
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

  // Handle search change and display suggested products
  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search.length === 0) {
      setSuggestedProducts([]);
      return;
    }

    const filteredSuggestions = products.filter(
      (product) =>
        product.upc.includes(search) ||
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestedProducts(filteredSuggestions);
  };

  // Add product by UPC
  const addProductByUPC = (upc) => {
    const foundProduct = products.find((product) => product.upc === upc);
    if (foundProduct) {
      const updatedProducts = [...products, { ...foundProduct, quantity: 1 }];
      setProducts(updatedProducts);
    }
  };

  const resetCartHandler = () => {
    setProducts([]); // Reset the cart
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

  const handleSale = async (withReceipt = false) => {
    try {
      const receipt = generateReceipt(products, total);

      await addHistory({
        saleDate: receipt.date,
        receiptId: receipt.id,
        items: receipt.items,
        total: receipt.total,
        withReceipt,
      });

      if (withReceipt) {
        printReceipt(receipt);
      }

      setProducts([]);
      setIsReceipt(false);

      alert(t('saleComplete'));
    } catch (error) {
      console.error('Sale error:', error);
      alert(t('saleError'));
    }
  };

  const handleRefund = async () => {
    try {
      await processRefund(products);
      alert(t('refundComplete'));
      setProducts([]);
    } catch {
      alert(t('refundError'));
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='p-4'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetCartHandler={resetCartHandler}
        handleSearchChange={handleSearchChange}
      />

      {/* Suggested Products (appears if partial match found) */}
      {suggestedProducts.length > 0 && (
        <div className='mt-4'>
          <h3>{t('suggestions')}</h3>
          <ul>
            {suggestedProducts.map((product) => (
              <li key={product.upc}>
                <button
                  onClick={() => addProductByUPC(product.upc)}
                  className='text-primary hover:underline'
                >
                  {product.name} - {product.upc}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <PredefinedPriceButtons onAddPrice={addPredefinedPrice} />

      <ProductsTable
        products={products}
        onQuantityChange={handleQuantityChange}
        onRemove={removeItem}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <ActionButtons
        total={total}
        onSellWithReceipt={() => handleSale(true)}
        onSellWithoutReceipt={() => handleSale(false)}
        onRefund={handleRefund}
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
