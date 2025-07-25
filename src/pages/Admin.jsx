import { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { BarChart, Bell, UserPlus, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('analytics');
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [users, setUsers] = useState([
    { name: 'John Doe', password: '123456' },
    { name: 'Jane Smith', password: 'abcdef' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', password: '' });

  const salesData = {
    today: 5000,
    week: 30000,
    month: 120000,
    year: 1500000,
  };

  const profitData = {
    today: 2000,
    week: 12000,
    month: 48000,
    year: 600000,
  };

  const addUser = () => {
    if (!newUser.name || !newUser.password) return;
    setUsers([...users, { ...newUser }]);
    setNewUser({ name: '', password: '' });
  };

  const deleteUser = (name) => {
    setUsers(users.filter((user) => user.name !== name));
  };

  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart size={18} /> },
    { id: 'news', label: 'News', icon: <Bell size={18} /> },
    { id: 'users', label: 'Users', icon: <UserPlus size={18} /> },
  ];

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      {/* Navbar */}
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

      {/* Main Content */}
      <main className='p-6'>
        {selectedPage === 'analytics' && (
          <section>
            <h2 className='text-3xl font-bold mb-6'>Sales Overview</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Stats + Filter */}
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between'>
                <div className='space-y-4'>
                  <div className='text-lg'>
                    <p>Total Sales:</p>
                    <p className='text-2xl font-bold'>
                      ${salesData[selectedPeriod]}
                    </p>
                  </div>
                  <div className='text-lg'>
                    <p>Total Profit:</p>
                    <p className='text-2xl font-bold'>
                      ${profitData[selectedPeriod]}
                    </p>
                  </div>
                </div>
                <div className='mt-6'>
                  <p className='mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                    Filter by Period:
                  </p>
                  <div className='flex gap-2 flex-wrap'>
                    {['today', 'week', 'month', 'year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-4 py-2 text-sm rounded-full transition ${
                          selectedPeriod === period
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                        }`}
                      >
                        {period === 'today' && 'Today'}
                        {period === 'week' && 'This Week'}
                        {period === 'month' && 'This Month'}
                        {period === 'year' && 'This Year'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
                <h3 className='text-2xl font-semibold mb-4'>Monthly Profit</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveBar
                    data={[
                      { month: 'Jan', profit: 3000 },
                      { month: 'Feb', profit: 4500 },
                      { month: 'Mar', profit: 5200 },
                      { month: 'Apr', profit: 6100 },
                      { month: 'May', profit: 7200 },
                      { month: 'Jun', profit: 5000 },
                      { month: 'Jul', profit: 6500 },
                      { month: 'Aug', profit: 7000 },
                      { month: 'Sep', profit: 5300 },
                      { month: 'Oct', profit: 4800 },
                      { month: 'Nov', profit: 5600 },
                      { month: 'Dec', profit: 6800 },
                    ]}
                    keys={['profit']}
                    indexBy='month'
                    margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
                    padding={0.3}
                    layout='vertical'
                    colors={{ scheme: 'category10' }}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      legend: 'Month',
                      legendOffset: 36,
                      legendPosition: 'middle',
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      legend: 'Profit ($)',
                      legendOffset: -40,
                      legendPosition: 'middle',
                    }}
                    theme={{
                      axis: {
                        ticks: {
                          text: {
                            fill: '#4B5563',
                          },
                        },
                      },
                      legends: {
                        text: {
                          fill: '#4B5563',
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {selectedPage === 'news' && (
          <section>
            <h2 className='text-3xl font-bold mb-4'>News / Notifications</h2>
            <div className='space-y-4'>
              <div className='p-4 bg-blue-100 dark:bg-blue-900 rounded-md shadow'>
                <h3 className='font-bold text-lg'>New Products Added</h3>
                <p>Apple and Banana added to the inventory today!</p>
              </div>
              <div className='p-4 bg-green-100 dark:bg-green-900 rounded-md shadow'>
                <h3 className='font-bold text-lg'>Sales Update</h3>
                <p>Today's sales reached $5000 so far.</p>
              </div>
            </div>
          </section>
        )}

        {selectedPage === 'users' && (
          <section>
            <h2 className='text-3xl font-bold mb-4'>User Management</h2>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addUser();
                }}
                className='flex flex-col sm:flex-row gap-4 mb-6'
              >
                <input
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className='p-2 border border-gray-300 dark:border-gray-600 rounded flex-1'
                  placeholder='Name'
                />
                <input
                  type='password'
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className='p-2 border border-gray-300 dark:border-gray-600 rounded flex-1'
                  placeholder='Password'
                />
                <button
                  type='submit'
                  className='bg-blue-600 text-white px-4 py-2 rounded'
                >
                  Add User
                </button>
              </form>

              <div>
                <h3 className='text-2xl font-semibold mb-2'>User List</h3>
                <ul className='space-y-2'>
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className='flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded shadow-sm'
                    >
                      <span>
                        {user.name}{' '}
                        <span className='text-sm text-gray-400'>••••••</span>
                      </span>
                      <button
                        onClick={() => deleteUser(user.name)}
                        className='bg-red-500 hover:bg-red-600 text-white p-2 rounded'
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
