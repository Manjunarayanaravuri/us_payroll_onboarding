import React from 'react';
import { LayoutDashboardIcon, ClipboardListIcon, MapPinIcon, SparklesIcon } from '../icons/Icon';

const FeatureItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="flex items-start p-4 bg-frappe-gray-50 rounded-lg">
    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-frappe-blue-100 rounded-lg text-frappe-blue-600">
      {icon}
    </div>
    <div className="ml-4">
      <h4 className="text-base font-semibold text-frappe-gray-800">{title}</h4>
      <p className="mt-1 text-sm text-frappe-gray-600">{description}</p>
    </div>
  </div>
);

const FeatureList: React.FC = () => {
  const features = [
    {
      icon: <LayoutDashboardIcon className="w-6 h-6" />,
      title: "Dashboard Overview",
      description: "View all employees and contractors, their roles, and onboarding status at a glance."
    },
    {
      icon: <ClipboardListIcon className="w-6 h-6" />,
      title: "Guided Onboarding",
      description: "A step-by-step process to ensure all necessary federal and state tax forms are completed accurately."
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: "Dynamic State Forms",
      description: "The correct state tax form is automatically assigned based on the employee's state of residence."
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: "Smart Auto-Population",
      description: "Zip code selection automatically fills city and county information, and manual entry is allowed for flexibility."
    },
  ];

  return (
    <div className="animate-fade-in">
       <h3 className="text-lg font-semibold text-frappe-gray-800 mb-4">
          Key Features
        </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} />
        ))}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default FeatureList;