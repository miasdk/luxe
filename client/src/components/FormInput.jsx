// components/FormInput.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function FormInput({ 
  id, 
  label, 
  type = 'text', 
  icon: Icon, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  helpText
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={18} className="text-gray-400" />
          </div>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-12' : 'pr-4'} py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye size={18} className="text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}

// components/FormButton.jsx
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

// components/FormError.jsx
import { AlertCircle } from 'lucide-react';

export default function FormError({ message }) {
  if (!message) return null;
  
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
      <AlertCircle size={18} className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}

// components/SocialButtons.jsx
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function SocialButtons() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          disabled
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          Google
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
          disabled
        >
          <FaGithub className="w-5 h-5 mr-2" />
          GitHub
        </button>
      </div>
    </div>
  );
}