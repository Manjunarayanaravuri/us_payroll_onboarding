import React, { useState } from 'react';
import Modal from './ui/Modal';
import UserManual from './help/UserManual';
import FeatureList from './help/FeatureList';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'manual' | 'features';

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('manual');

  const tabClasses = "px-4 py-2 text-sm font-medium border-b-2 transition-colors focus:outline-none";
  const activeTabClasses = "border-frappe-blue-500 text-frappe-blue-600";
  const inactiveTabClasses = "border-transparent text-frappe-gray-500 hover:text-frappe-gray-700 hover:border-frappe-gray-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help Center">
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('manual')}
              className={`${tabClasses} ${activeTab === 'manual' ? activeTabClasses : inactiveTabClasses}`}
            >
              User Manual
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`${tabClasses} ${activeTab === 'features' ? activeTabClasses : inactiveTabClasses}`}
            >
              Feature List
            </button>
          </nav>
        </div>
        <div className="py-6">
          {activeTab === 'manual' && <UserManual />}
          {activeTab === 'features' && <FeatureList />}
        </div>
      </div>
    </Modal>
  );
};

export default HelpModal;