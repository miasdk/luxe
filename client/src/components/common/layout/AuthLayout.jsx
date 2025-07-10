// components/AuthLayout.jsx
import { motion } from 'framer-motion';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-pattern opacity-5 z-0"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            {children}
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>By using our service, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a></p>
        </div>
      </motion.div>
    </div>
  );
}