import { useState, useEffect } from 'react';
import WarehouseNav from '../components/warehouse/WarehouseNav';
import ProductsTable from '../components/warehouse/ProductsTable';
import AddItemForm from '../components/warehouse/AddItemForm';
import ProductModal from '../components/warehouse/ProductModal';
import { getProducts, updateItem, deleteItem } from '../utils/FetchData';

const Warehouse = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        setItems(products);
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const handleUpdate = async () => {
    try {
      setActionLoading(true);
      const updatedItem = await updateItem(currentItem.docId, currentItem);
      const updatedItems = items.map((item) =>
        item.docId === updatedItem.docId ? updatedItem : item
      );
      setItems(updatedItems);
      closeModal();
    } catch (error) {
      setError(error.message);
      console.error('Update error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    console.log('Deleting item:', items);
    try {
      setActionLoading(true);
      await deleteItem(currentItem.docId);
      const updatedItems = items.filter(
        (item) => item.docId !== currentItem.docId
      );
      setItems(updatedItems);
      closeModal();
    } catch (error) {
      setError(error.message);
      console.error('Delete error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <WarehouseNav
        selectedPage={selectedPage}
        handlePageChange={handlePageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      {error && (
        <div className='p-4 mb-4 text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded'>
          {error}
        </div>
      )}

      {selectedPage === 0 && (
        <ProductsTable
          items={filterItems()}
          openModal={openModal}
          loading={loading}
        />
      )}

      {selectedPage === 1 && (
        <AddItemForm onAddItem={(newItem) => setItems([...items, newItem])} />
      )}

      {showModal && currentItem && (
        <ProductModal
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          closeModal={closeModal}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default Warehouse;
