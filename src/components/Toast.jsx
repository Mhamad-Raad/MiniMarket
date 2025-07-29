const Toast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green' : 'bg-red';

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center gap-2`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className='ml-2 hover:text-gray-200 transition-colors'
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
