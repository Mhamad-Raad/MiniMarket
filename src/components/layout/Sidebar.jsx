import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShoppingCart,
  Warehouse,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Toggle Dark/Light Theme
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Load theme preference from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const links = [
    { path: '/', label: 'Cashier', icon: ShoppingCart },
    { path: '/warehouse', label: 'Warehouse', icon: Warehouse },
    { path: '/admin', label: 'Admin', icon: BarChart2 },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-56'
      } transition-all duration-300 bg-surface border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 min-h-screen flex flex-col overflow-hidden`}
    >
      <div
        className={`flex items-center ${
          collapsed ? 'justify-center' : 'justify-between'
        } p-4 overflow-hidden`}
      >
        <h1
          className={`text-xl font-bold text-primary dark:text-white whitespace-nowrap transition-all duration-700 ease-in-out ${
            collapsed
              ? 'opacity-0 max-w-0 overflow-hidden'
              : 'opacity-100 max-w-[200px]'
          }`}
        >
          MiniMarket
        </h1>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className='p-1 rounded hover:bg-secondary/40 dark:hover:bg-gray-800'
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className='flex flex-col gap-2 px-2'>
        {links.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-secondary/30 dark:text-white dark:hover:bg-gray-800'
              } ${collapsed ? 'justify-center' : 'justify-start gap-3'}`
            }
          >
            <Icon size={20} />
            <span
              className={`transition-all duration-300 origin-left ${
                collapsed
                  ? 'opacity-0 scale-0 w-0'
                  : 'opacity-100 scale-100 w-auto'
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className='flex justify-center items-center px-4 py-4 mt-auto'>
          <span className='text-text dark:text-white mr-2'>Light</span>
          <label
            htmlFor='theme-toggle'
            className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'
          >
            <input
              type='checkbox'
              id='theme-toggle'
              checked={isDark}
              onChange={toggleTheme}
              className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer'
            />
            <span className='toggle-label block w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-600'></span>
          </label>
          <span className='text-text dark:text-white ml-2'>Dark</span>
        </div>
      )}

      <div
        className={`bg-gray-800 text-center py-2 text-xs text-gray-400 ${
          collapsed && 'mt-auto'
        }`}
      >
        {collapsed ? (
          <p>© 2025</p>
        ) : (
          <p className='overflow-hidden whitespace-nowrap'>
            © 2025 MiniMarket. All rights reserved.
          </p>
        )}
      </div>
    </aside>
  );
}
