import { db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

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
