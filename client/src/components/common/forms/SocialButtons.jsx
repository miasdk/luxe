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