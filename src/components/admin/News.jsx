import { useState, useEffect } from 'react';
import { fetchNews } from '../../utils/FetchData';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const fetchedNews = await fetchNews();
        setNews(fetchedNews);
      } catch (err) {
        setError('Failed to load news.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className='text-center py-20 text-lg font-bold text-gray-600 dark:text-gray-300'>
        Loading news...
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-20 text-lg font-bold text-red-600'>
        {error}
      </div>
    );
  }

  return (
    <section>
      <h2 className='text-3xl font-bold mb-6'>News / Notifications</h2>
      <div className='space-y-4'>
        {news.map((newsItem) => (
          <div
            key={newsItem.id}
            className={`p-4 rounded-md shadow ${
              newsItem.type === 'success'
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'bg-green-100 dark:bg-green-900'
            }`}
          >
            <h3 className='font-bold text-lg'>{newsItem.action}</h3>
            <p>{newsItem.description}</p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {new Date(newsItem.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
