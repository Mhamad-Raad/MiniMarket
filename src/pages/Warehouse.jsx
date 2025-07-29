import { useState } from 'react';
import WarehouseNav from '../components/warehouse/WarehouseNav';
import ProductsTable from '../components/warehouse/ProductsTable';
import AddItemForm from '../components/warehouse/AddItemForm';
import ProductModal from '../components/warehouse/ProductModal';

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
      <WarehouseNav
        selectedPage={selectedPage}
        handlePageChange={handlePageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      {selectedPage === 0 && (
        <ProductsTable items={filterItems()} openModal={openModal} />
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
        />
      )}
    </div>
  );
};

export default Warehouse;
