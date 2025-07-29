import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
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
    return true;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
};
