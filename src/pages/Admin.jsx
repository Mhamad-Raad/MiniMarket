import { useState } from 'react';
import Navbar from '../components/admin/Navbar';
import Analytics from '../components/admin/Analytics';
import News from '../components/admin/News';
import UserManagement from '../components/admin/UserManagement';

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('analytics');

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <main className='p-6'>
        {selectedPage === 'analytics' && <Analytics />}
        {selectedPage === 'news' && <News />}
        {selectedPage === 'users' && <UserManagement />}
      </main>
    </div>
  );
};

export default AdminDashboard;
