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