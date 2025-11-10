import React from 'react';
import { BookOpenIcon } from '../icons/Icon';

const UserManual: React.FC = () => {
  return (
    <div className="space-y-6 text-sm text-frappe-gray-600 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-frappe-gray-800 mb-3 flex items-center">
          <BookOpenIcon className="w-5 h-5 mr-2 text-frappe-blue-600" />
          How to Use the App
        </h3>
        <ol className="list-decimal list-outside space-y-3 pl-5">
          <li>
            <strong className="font-semibold text-frappe-gray-800">Adding a New Person:</strong>
            <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
              <li>Click the "Add New Person" button on the dashboard.</li>
              <li>Enter their full name, classification (W-2 Employee or 1099 Contractor), and state of residence.</li>
              <li>Click "Create & Onboard" to begin filling out their required tax forms.</li>
            </ul>
          </li>
          <li>
            <strong className="font-semibold text-frappe-gray-800">Completing Onboarding:</strong>
            <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
              <li>Follow the steps on the left to complete each required federal and state form.</li>
              <li>Your progress is automatically saved, so you can leave and come back anytime.</li>
              <li>After filling out all forms, review your information carefully on the "Review & Submit" step.</li>
              <li>Click "Submit Onboarding" to finalize and save all forms.</li>
            </ul>
          </li>
          <li>
            <strong className="font-semibold text-frappe-gray-800">Managing Employee Forms:</strong>
            <ul className="list-disc list-inside pl-4 mt-1 space-y-1">
              <li>From the dashboard, click on any person to view their profile.</li>
              <li>Here you can see all their submitted tax forms and view submission history.</li>
              <li>To file an updated version of a form, simply edit the details and click "Submit New Version".</li>
            </ul>
          </li>
        </ol>
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

export default UserManual;