import { FaGithub, FaHeart } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="container mx-auto text-center">
        <p className="text-gray-300 mb-3">
          Made with <FaHeart className="inline text-red-500" /> by Mia Elena Tapia
        </p>
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Luxe. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-3 text-sm transition-colors duration-200">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-3 text-sm transition-colors duration-200">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-3 text-sm transition-colors duration-200">Contact Us</a>
        </div>

        <div className="flex justify-center mt-6"> 
          <a href="https://github.com/miasdk/eCart" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200">
            <FaGithub className="text-gray-400 hover:text-white" size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}