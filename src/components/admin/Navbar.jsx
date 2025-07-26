import { BarChart, Bell, UserPlus } from 'lucide-react';

const navItems = [
  { id: 'analytics', label: 'Analytics', icon: <BarChart size={18} /> },
  { id: 'news', label: 'News', icon: <Bell size={18} /> },
  { id: 'users', label: 'Users', icon: <UserPlus size={18} /> },
];

const Navbar = ({ selectedPage, setSelectedPage }) => {
  return (
    <nav className='bg-white dark:bg-gray-800 shadow p-4'>
      <div className='flex gap-4 justify-start'>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedPage(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded transition border ${
              selectedPage === item.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
