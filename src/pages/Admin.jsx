import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { BarChart, Bell, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('analytics');

  return (
    <div className={'min-h-screen dark:bg-gray-900 bg-white'}>
      <Navbar setSelectedPage={setSelectedPage} />
      <div className='p-6'>
        {selectedPage === 'analytics' && <Analytics />}
        {selectedPage === 'news' && <News />}
        {selectedPage === 'users' && <UserManagement />}
      </div>
    </div>
  );
};

const Navbar = ({ setSelectedPage }) => {
  return (
    <nav className='bg-gray-800 text-white p-4 shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='space-x-6'>
          <button
            onClick={() => setSelectedPage('analytics')}
            className='text-white hover:text-gray-400'
          >
            <BarChart className='inline mr-2' />
            Analytics
          </button>
          <button
            onClick={() => setSelectedPage('news')}
            className='text-white hover:text-gray-400'
          >
            <Bell className='inline mr-2' />
            News
          </button>
          <button
            onClick={() => setSelectedPage('users')}
            className='text-white hover:text-gray-400'
          >
            <UserPlus className='inline mr-2' />
            Users
          </button>
        </div>
      </div>
    </nav>
  );
};

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

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

  const salesChartData = [
    {
      id: 'Sales',
      data: [
        { x: 'January', y: 1200 },
        { x: 'February', y: 1900 },
        { x: 'March', y: 3000 },
        { x: 'April', y: 5000 },
        { x: 'May', y: 8000 },
      ],
    },
  ];

  const productPerformanceData = [
    { product: 'Apple', sales: 1000 },
    { product: 'Banana', sales: 150 },
    { product: 'Orange', sales: 500 },
    { product: 'Peach', sales: 200 },
  ];

  return (
    <div>
      <h2 className='text-2xl mb-4'>Sales Overview</h2>
      <div className='flex gap-4 mb-6'>
        <button
          onClick={() => setSelectedPeriod('today')}
          className='p-2 bg-blue-500 text-white rounded'
        >
          Today
        </button>
        <button
          onClick={() => setSelectedPeriod('week')}
          className='p-2 bg-blue-500 text-white rounded'
        >
          This Week
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className='p-2 bg-blue-500 text-white rounded'
        >
          This Month
        </button>
        <button
          onClick={() => setSelectedPeriod('year')}
          className='p-2 bg-blue-500 text-white rounded'
        >
          This Year
        </button>
      </div>

      <p>Total Sales: ${salesData[selectedPeriod]}</p>
      <p>Total Profit: ${profitData[selectedPeriod]}</p>

      <div className='mt-6'>
        <div style={{ height: '300px' }}>
          <ResponsiveLine
            data={salesChartData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Month',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Sales',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
            enableGridX={false}
            lineWidth={3}
            enableArea={true}
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.4}
            areaBlendMode='normal'
            enableSlices='x'
          />
        </div>
      </div>

      {/* Product Performance Section */}
      <div className='mt-6'>
        <h3 className='text-xl mb-2'>Product Performance</h3>
        <div style={{ height: '300px' }}>
          <ResponsiveBar
            data={productPerformanceData}
            keys={['sales']}
            indexBy='product'
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            layout='vertical'
            colors={{ scheme: 'nivo' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Sales',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Products',
              legendOffset: -40,
              legendPosition: 'middle',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div>
      <h2 className='text-2xl mb-4'>News / Notifications</h2>
      <div className='space-y-4'>
        <div className='p-4 bg-gray-200 dark:bg-gray-800 rounded-md'>
          <h3 className='font-bold'>New Products Added</h3>
          <p>Apple and Banana added to the inventory today!</p>
        </div>
        <div className='p-4 bg-gray-200 dark:bg-gray-800 rounded-md'>
          <h3 className='font-bold'>Sales Update</h3>
          <p>Today's sales reached $5000 so far.</p>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([
    { name: 'John Doe', role: 'Admin' },
    { name: 'Jane Smith', role: 'Employee' },
  ]);

  const addUser = (name, role) => {
    setUsers([...users, { name, role }]);
  };

  const deleteUser = (name) => {
    setUsers(users.filter((user) => user.name !== name));
  };

  return (
    <div>
      <h2 className='text-2xl mb-4'>User Management</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser('New User', 'Employee');
        }}
      >
        <input className='p-2' placeholder='Name' />
        <select className='p-2'>
          <option value='Employee'>Employee</option>
          <option value='Admin'>Admin</option>
        </select>
        <button className='bg-blue-500 text-white p-2 rounded'>Add User</button>
      </form>

      <div className='mt-4'>
        <h3 className='text-xl mb-2'>User List</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} className='flex justify-between items-center p-2'>
              <span>
                {user.name} ({user.role})
              </span>
              <button
                onClick={() => deleteUser(user.name)}
                className='bg-red-500 text-white p-1 rounded'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
