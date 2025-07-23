import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShoppingCart,
  Warehouse,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const links = [
    { path: '/', label: t('cashier'), icon: ShoppingCart },
    { path: '/warehouse', label: t('warehouse'), icon: Warehouse },
    { path: '/admin', label: t('admin'), icon: BarChart2 },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'min-w-56'
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
          <label
            htmlFor='language-dropdown'
            className='text-text dark:text-white mr-2'
          >
            {t('language')}
          </label>
          <select
            id='language-dropdown'
            onChange={(e) => changeLanguage(e.target.value)}
            className='bg-surface dark:bg-gray-800 text-text dark:text-white rounded-md p-2 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary'
            defaultValue={i18n.language}
          >
            <option value='en'>English</option>
            <option value='ar'>Arabic</option>
            <option value='ku'>Kurdish</option>
          </select>
        </div>
      )}

      {!collapsed && (
        <div className='flex justify-center items-center px-4 py-4'>
          <span className='text-text dark:text-white mr-2'>{t('light')}</span>
          <label
            htmlFor='theme-toggle'
            className='relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in'
          >
            <input
              type='checkbox'
              id='theme-toggle'
              checked={isDark}
              onChange={toggleTheme}
              className='sr-only peer'
            />
            <span
              className={`
                block w-12 h-6 rounded-full
                transition-colors duration-300
                bg-gray-300 dark:bg-gray-600
                peer-checked:bg-primary
              `}
            ></span>
            <span
              className={`
                absolute left-0 top-0 w-6 h-6 bg-white border-2 border-gray-300
                rounded-full shadow-md transition-transform duration-300
                peer-checked:translate-x-6
              `}
            ></span>
          </label>
          <span className='text-text dark:text-white ml-2'>{t('dark')}</span>
        </div>
      )}

      <div
        className={`
    text-center py-2 text-xs
    ${collapsed ? 'mt-auto' : ''}
    bg-surface text-gray-400 border-t border-gray-200
    dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700
  `}
      >
        {collapsed ? (
          <p>© 2025</p>
        ) : (
          <p className='overflow-hidden whitespace-nowrap'>
            {t('allRightsReserved')}
          </p>
        )}
      </div>
    </aside>
  );
}
