import React from 'react';
import { Sprout, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-8 w-8 text-green-500" />
              <span className="font-bold text-xl text-white">FreshGreens</span>
            </div>
            <p className="text-sm text-gray-400">
              Delivering the freshest organic produce from local farms directly to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-400">Home</Link></li>
              <li><Link to="/shop" className="hover:text-green-400">Shop All</Link></li>
              <li><Link to="/cart" className="hover:text-green-400">My Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-400">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-green-400">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-green-400">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-400"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-green-400"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} FreshGreens Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;