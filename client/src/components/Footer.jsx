import { FaGithub } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} eCart. All rights reserved.
        </p>
        <div className="mt-2">
          <a href="/privacy" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact Us</a>
        </div>
      </div>

        <div className="flex justify-center mt-4">  
            <FaGithub className="text-gray-400 hover:text-white mx-2" size={24} />
        </div>
    </footer>
  );
}