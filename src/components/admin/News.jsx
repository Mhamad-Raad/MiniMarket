const News = () => {
  return (
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
  );
};

export default News;
