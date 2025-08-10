import { useState } from 'react';
import Navbar from '../components/admin/Navbar';
import Analytics from '../components/admin/Analytics';
import News from '../components/admin/News';
import UserManagement from '../components/admin/UserManagement';
import { fetchUsers } from '../utils/FetchData';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState('analytics');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const usersData = await fetchUsers();
      const user = usersData.find((user) => {
        return (
          user.username === loginData.username &&
          user.password === loginData.password
        );
      });
      if (user && user.role === 'Admin') {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        throw new Error(t('invalidCredentialsOrPermissions'));
      }
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-[400px] h-full ${
        !isLoggedIn && 'flex justify-center items-center'
      } bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}
    >
      {!isLoggedIn ? (
        <div className='w-[500px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto border border-gray-200 dark:border-gray-700'>
          <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
            {t('adminLogin')}
          </h2>
          {error && (
            <div className='p-3 mb-4 text-sm text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-200 rounded'>
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <input
              type='text'
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              className='p-2 border border-gray-300 dark:border-gray-600 rounded
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent'
              placeholder={t('username')}
              disabled={isLoading}
            />
            <input
              type='password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className='p-2 border border-gray-300 dark:border-gray-600 rounded
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent'
              placeholder={t('password')}
              disabled={isLoading}
            />
            <button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded
                disabled:opacity-50 transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
              disabled={isLoading}
            >
              {isLoading ? t('loggingIn') : t('login')}
            </button>
          </form>
          <p>User Name: Admin - Password: 123</p>
        </div>
      ) : (
        <>
          <Navbar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <main className='p-6'>
            {selectedPage === 'analytics' && <Analytics />}
            {selectedPage === 'news' && <News />}
            {selectedPage === 'users' && <UserManagement />}
          </main>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
