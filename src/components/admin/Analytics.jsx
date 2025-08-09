import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { fetchHistory } from '../../utils/FetchData';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [salesData, setSalesData] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });
  const [profitData, setProfitData] = useState({
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlyCharts, setMonthlyCharts] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  let monthlySales = new Array(12).fill(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedHistory = await fetchHistory();
        setHistoryData(fetchedHistory);

        const salesByPeriod = {
          today: 0,
          week: 0,
          month: 0,
          year: 0,
        };

        const profitByPeriod = {
          today: 0,
          week: 0,
          month: 0,
          year: 0,
        };

        let totalProfitAmount = 0;

        monthlySales = new Array(12).fill(0);

        fetchedHistory.forEach((transaction) => {
          const saleAmount = transaction.total;
          const productDate = new Date(transaction.saleDate);

          if (isToday(productDate)) salesByPeriod.today += saleAmount;
          if (isThisWeek(productDate)) salesByPeriod.week += saleAmount;
          if (isThisMonth(productDate)) salesByPeriod.month += saleAmount;
          if (isThisYear(productDate)) salesByPeriod.year += saleAmount;

          if (isToday(productDate)) profitByPeriod.today += saleAmount;
          if (isThisWeek(productDate)) profitByPeriod.week += saleAmount;
          if (isThisMonth(productDate)) profitByPeriod.month += saleAmount;
          if (isThisYear(productDate)) profitByPeriod.year += saleAmount;

          totalProfitAmount += saleAmount;

          const monthIndex = productDate.getMonth();
          monthlySales[monthIndex] += saleAmount;
        });

        setSalesData(salesByPeriod);
        setProfitData(profitByPeriod);
        setTotalProfit(totalProfitAmount);
        setMonthlyCharts(monthlySales);

        console.log('Monthly Sales Data:', monthlySales);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisWeek = (date) => {
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay();
    const endOfWeek = startOfWeek + 6;
    const dateOfYear = date.getDate();
    return dateOfYear >= startOfWeek && dateOfYear <= endOfWeek;
  };

  const isThisMonth = (date) => {
    const today = new Date();
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isThisYear = (date) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear();
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
                ${totalProfit.toLocaleString()}
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
          <h3 className='text-2xl font-semibold mb-4'>Monthly Sales</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveBar
              data={monthlyCharts.map((salesAmount, index) => {
                console.log(
                  'Processing month:',
                  index + 1,
                  'Sales:',
                  salesAmount
                );
                return {
                  month: new Date(0, index).toLocaleString('en', {
                    month: 'short',
                  }),
                  sales: salesAmount,
                };
              })}
              keys={['sales']}
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
                legend: 'Sales ($)',
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
              ariaLabel='Monthly sales chart'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
