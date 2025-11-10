import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, HelpCircleIcon } from './icons/Icon';
import HelpModal from './HelpModal';

const Sidebar: React.FC = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const navLinkClasses = "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors w-full";
  const activeClasses = "bg-frappe-blue-500 text-white";
  const inactiveClasses = "text-frappe-gray-600 hover:bg-frappe-gray-200";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `${navLinkClasses} ${isActive ? activeClasses : inactiveClasses}`;

  return (
    <>
      <aside className="w-64 flex-shrink-0 bg-white border-r border-frappe-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-16 border-b border-frappe-gray-200">
          <h1 className="text-xl font-bold text-frappe-gray-800">Frappe Payroll</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/dashboard" end className={getNavLinkClass}>
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
        </nav>
        <div className="px-4 py-6 mt-auto border-t border-frappe-gray-200">
           <button onClick={() => setIsHelpModalOpen(true)} className={`${navLinkClasses} ${inactiveClasses}`}>
            <HelpCircleIcon className="w-5 h-5 mr-3" />
            User Manual & Features
          </button>
        </div>
      </aside>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
};

export default Sidebar;