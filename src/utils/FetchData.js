import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

export const fetchUsers = async () => {
  console.log('Fetching users...');
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched users:', usersList);
    return usersList;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const addNewItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, 'items'), item);
    console.log('New item added with ID:', docRef.id);

    const newsData = {
      action: 'Added Item',
      date: new Date().toISOString(),
      description: `Item ID: ${docRef.id} was added with name: ${item.name}`,
    };
    await addNews(newsData);

    return { id: docRef.id, ...item };
  } catch (error) {
    console.error('Error adding new item:', error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const productsList = querySnapshot.docs.map((doc) => {
      return {
        docId: doc.id,
        ...doc.data(),
      };
    });
    console.log('Fetched products:', productsList);
    return productsList;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const updateItem = async (docId, updatedData) => {
  try {
    const itemRef = doc(db, 'items', docId);
    await updateDoc(itemRef, updatedData);

    const newsData = {
      action: 'Updated Item',
      date: new Date().toISOString(),
      description: `Item ID: ${docId} was updated with new details`,
    };
    await addNews(newsData);

    return { docId, ...updatedData };
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
};

export const deleteItem = async (docId) => {
  try {
    const itemRef = doc(db, 'items', docId);
    await deleteDoc(itemRef);

    const newsData = {
      action: 'Deleted Item',
      date: new Date().toISOString(),
      description: `Item ID: ${docId} was deleted`,
    };
    await addNews(newsData);

    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
};

export const addHistory = async (historyData) => {
  try {
    const docRef = await addDoc(collection(db, 'history'), historyData);
    console.log('History entry added with ID:', docRef.id);
    return { id: docRef.id, ...historyData };
  } catch (error) {
    console.error('Error adding history entry:', error);
    throw new Error('Failed to add history entry');
  }
};

export const fetchHistory = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'history'));
    const historyList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched history:', historyList);
    return historyList;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw new Error('Failed to fetch history');
  }
};

export const addNews = async (newsData) => {
  try {
    const docRef = await addDoc(collection(db, 'news'), newsData);
    console.log('News added with ID:', docRef.id);
    return { id: docRef.id, ...newsData };
  } catch (error) {
    console.error('Error adding news:', error);
    throw new Error('Failed to add news');
  }
};

export const fetchNews = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'news'));
    const newsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched news:', newsList);
    return newsList;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news');
  }
};

export const processRefund = async (refundedItems) => {
  try {
    const refundRecord = {
      refundDate: new Date().toISOString(),
      items: refundedItems,
    };

    const docRef = await addDoc(collection(db, 'refunds'), refundRecord);
    console.log('Refund record added with ID:', docRef.id);

    for (const item of refundedItems) {
      const q = query(collection(db, 'items'), where('upc', '==', item.upc));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const itemDoc = querySnapshot.docs[0];
        const itemRef = doc(db, 'items', itemDoc.id);
        const itemData = itemDoc.data();

        const newQuantity = (itemData.quantity || 0) + item.quantity;

        await updateDoc(itemRef, {
          quantity: newQuantity,
        });

        console.log(`Restored quantity for ${item.name}: now ${newQuantity}`);
      } else {
        console.warn(`Item with UPC ${item.upc} not found in database.`);
      }
    }

    const newsData = {
      action: 'Processed Refund',
      date: new Date().toISOString(),
      description: `Refund processed for items: ${refundedItems
        .map((item) => item.name)
        .join(', ')}`,
    };
    await addNews(newsData);

    return true;
  } catch (error) {
    console.error('Refund processing error:', error);
    throw new Error('Failed to process refund');
  }
};
