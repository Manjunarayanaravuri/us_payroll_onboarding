
import React from 'react';
import { SearchIcon, BellIcon } from './icons/Icon';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b border-frappe-gray-200">
      <div className="flex items-center">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-frappe-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 text-frappe-gray-700 bg-frappe-gray-100 border border-transparent rounded-md focus:border-frappe-blue-500 focus:ring-frappe-blue-500 focus:ring-opacity-50 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative text-frappe-gray-500 hover:text-frappe-gray-700">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span>
        </button>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://picsum.photos/id/1025/200/200"
          alt="User Avatar"
        />
      </div>
    </header>
  );
};

export default Header;
