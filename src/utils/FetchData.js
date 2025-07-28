import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
