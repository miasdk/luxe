export default function FormButton({ 
  type = 'button', 
  onClick, 
  loading = false, 
  children,
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
} 