import { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar';

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

  return (
    <section>
      <h2 className='text-3xl font-bold mb-6'>Sales Overview</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex flex-col justify-between'>
          <div className='space-y-4'>
            <div className='text-lg'>
              <p>Total Sales:</p>
              <p className='text-2xl font-bold'>
                ${salesData[selectedPeriod].toLocaleString()}
              </p>
            </div>
            <div className='text-lg'>
              <p>Total Profit:</p>
              <p className='text-2xl font-bold'>
                ${profitData[selectedPeriod].toLocaleString()}
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
              valueScale={{ type: 'linear' }}
              colors={{ scheme: 'category10' }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
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
                tooltip: {
                  container: {
                    background: '#ffffff',
                    color: '#333333',
                    fontSize: 12,
                  },
                },
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              role='application'
              ariaLabel='Monthly profit chart'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
