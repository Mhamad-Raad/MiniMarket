import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onLogin(loginData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mt-12'>
      <div className='bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700'>
        <h2 className='text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center'>
          Admin Login
        </h2>

        {error && (
          <div className='p-4 mb-6 text-sm rounded-lg bg-red-50 dark:bg-red-900/50 text-red-500 dark:text-red-200 border border-red-200 dark:border-red-800'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <input
              type='text'
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent
                       transition-colors duration-200'
              placeholder='Username'
              disabled={isLoading}
            />
          </div>
          <div>
            <input
              type='password'
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className='w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent
                       transition-colors duration-200'
              placeholder='Password'
              disabled={isLoading}
            />
          </div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 
                     text-white font-medium focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                     transition-colors duration-200 disabled:opacity-50'
          >
            {isLoading ? (
              <span className='flex items-center justify-center'>
                <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                    fill='none'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
