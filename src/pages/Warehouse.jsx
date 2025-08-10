import { useState, useEffect } from 'react';
import WarehouseNav from '../components/warehouse/WarehouseNav';
import ProductsTable from '../components/warehouse/ProductsTable';
import AddItemForm from '../components/warehouse/AddItemForm';
import ProductModal from '../components/warehouse/ProductModal';
import { getProducts, updateItem, deleteItem } from '../utils/FetchData';
import { useTranslation } from 'react-i18next';

const Warehouse = () => {
  const { t } = useTranslation();

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
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
        setFilteredItems(products);
      } catch (error) {
        setError(t('failedToLoadProducts'));
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterItems = () => {
    let filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.upc.includes(searchTerm)
    );

    if (filterDate) {
      filtered = filtered.filter(
        (item) =>
          item.manufactureDate.includes(filterDate) ||
          item.expiryDate.includes(filterDate)
      );
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterItems();
    setFilteredItems(filtered);
  }, [searchTerm, filterDate, items]);

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

  const resetFilters = () => {
    setSearchTerm('');
    setFilterDate('');
    setFilteredItems(items);
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
        onReset={resetFilters}
        t={t}
      />

      {error && (
        <div className='p-4 mb-4 text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded'>
          {error}
        </div>
      )}

      {selectedPage === 0 && (
        <ProductsTable
          items={filteredItems}
          openModal={openModal}
          loading={loading}
          t={t}
        />
      )}

      {selectedPage === 1 && (
        <AddItemForm
          onAddItem={(newItem) => setItems([...items, newItem])}
          t={t}
        />
      )}

      {showModal && currentItem && (
        <ProductModal
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          closeModal={closeModal}
          loading={actionLoading}
          t={t}
        />
      )}
    </div>
  );
};

export default Warehouse;
