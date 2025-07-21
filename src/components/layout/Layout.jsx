import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex min-h-screen bg-background dark:bg-gray-950 text-text dark:text-white'>
      <Sidebar />
      <main className='flex-1 p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
