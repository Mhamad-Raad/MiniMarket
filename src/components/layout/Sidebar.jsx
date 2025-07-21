import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { path: '/cashier', label: 'Cashier' },
    { path: '/warehouse', label: 'Warehouse' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <aside className='w-64 min-h-screen bg-surface border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
      <div className='p-6 text-2xl font-bold text-primary'>MiniMarket</div>
      <nav className='flex flex-col gap-2 px-4'>
        {links.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-text hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
