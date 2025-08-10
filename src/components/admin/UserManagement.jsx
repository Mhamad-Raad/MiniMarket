import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Importing the useTranslation hook
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase';

const UserManagement = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: '', password: '' });

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.password) return;
    try {
      await addDoc(collection(db, 'users'), newUser);
      setNewUser({ name: '', password: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <section>
      <h2 className='text-3xl font-bold mb-4'>{t('userManagement')}</h2>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
        <form
          onSubmit={addUser}
          className='flex flex-col sm:flex-row gap-4 mb-6'
        >
          <input
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className='p-2 border border-gray-300 dark:border-gray-600 rounded flex-1 dark:text-black'
            placeholder={t('name')}
          />
          <input
            type='password'
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className='p-2 border border-gray-300 dark:border-gray-600 rounded flex-1 dark:text-black'
            placeholder={t('password')}
          />
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded'
          >
            {t('addUser')} // Localized button text
          </button>
        </form>

        <div>
          <h3 className='text-2xl font-semibold mb-2'>{t('userList')}</h3>
          {loading ? (
            <p className='text-center py-4'>{t('loadingUsers')}</p>
          ) : (
            <ul className='space-y-2'>
              {users.map((user) => (
                <li
                  key={user.id}
                  className='flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow-sm'
                >
                  <span>
                    {user.name}{' '}
                    <span className='text-sm text-gray-400'>••••••</span>
                  </span>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className='bg-red-500 hover:bg-red-600 text-white p-2 rounded'
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
