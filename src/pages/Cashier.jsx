import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Minus, Trash } from 'lucide-react';

import SearchBar from '../components/cashier/SearchBar';
import PredefinedPriceButtons from '../components/cashier/PredefinedPriceButtons';
import ProductsTable from '../components/cashier/ProductsTable';
import ActionButtons from '../components/cashier/ActionButtons';
import { generateReceipt, printReceipt } from '../utils/receiptGenerator';
import { addHistory, processRefund, getProducts } from '../utils/FetchData';

const Cashier = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]); // To store the available products (from Firestore)
  const [cart, setCart] = useState([]); // Empty cart initially
  const [searchTerm, setSearchTerm] = useState('');
  const [isReceipt, setIsReceipt] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts); // Set fetched products as available products
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 0) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const handleQuantityChange = (e, index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(e.target.value, 10) || 0;
    setCart(updatedCart);
  };

  // Handle search change and display suggested products
  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    if (search.length === 0) {
      setSuggestedProducts([]); // Clear suggestions if no search term
      return;
    }

    console.log('Searching for:', search);
    console.log('Available products:', products);

    // Filter products based on UPC or name
    const filteredSuggestions = products.filter(
      (product) =>
        product.upc.includes(search) ||
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    setSuggestedProducts(filteredSuggestions);
  };

  // Add product to cart by UPC
  const addProductByUPC = (upc) => {
    const foundProduct = products.find((product) => product.upc === upc);
    if (foundProduct) {
      // Check if the product is already in the cart
      const productInCart = cart.find((product) => product.upc === upc);

      if (productInCart) {
        // If the product is already in the cart, increase its quantity
        const updatedCart = cart.map((product) =>
          product.upc === upc
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        setCart(updatedCart);
      } else {
        // Otherwise, add it to the cart with quantity 1
        const updatedCart = [...cart, { ...foundProduct, quantity: 1 }];
        setCart(updatedCart);
      }
    }

    // Reset the search term and clear suggestions after adding a product
    setSearchTerm('');
    setSuggestedProducts([]);
  };

  const resetCartHandler = () => {
    setCart([]); // Reset the cart
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const addPredefinedPrice = (amount) => {
    setCart([
      ...cart,
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
      const receipt = generateReceipt(cart, total);

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

      setCart([]); // Empty cart after sale
      setIsReceipt(false);

      alert(t('saleComplete'));
    } catch (error) {
      console.error('Sale error:', error);
      alert(t('saleError'));
    }
  };

  const handleRefund = async () => {
    try {
      await processRefund(cart);
      alert(t('refundComplete'));
      setCart([]); // Empty cart after refund
    } catch {
      alert(t('refundError'));
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='p-4'>
      <div className='relative w-full'>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          resetCartHandler={resetCartHandler}
          handleSearchChange={handleSearchChange}
        />

        {/* Suggested Products (appears if partial match found) */}
        {searchTerm && suggestedProducts.length > 0 && (
          <div className='absolute mt-12 w-full max-h-[140px] overflow-y-scroll bg-white shadow-lg dark:bg-gray-800 dark:shadow-blue-400 rounded-md top-[10px] z-10 '>
            <ul>
              {suggestedProducts.map((product) => (
                <li key={product.upc}>
                  <button
                    onClick={() => addProductByUPC(product.upc)}
                    className='w-full text-left py-2 px-4 text-sm text-gray-900 dark:text-white hover:bg-primary hover:text-white transition-all rounded-md'
                  >
                    {product.name} - {product.upc}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <PredefinedPriceButtons onAddPrice={addPredefinedPrice} />

      <ProductsTable
        products={cart}
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
