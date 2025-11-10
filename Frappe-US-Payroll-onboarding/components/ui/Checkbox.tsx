
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, error, ...props }) => {
  return (
    <div>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4 text-frappe-blue-600 border-frappe-gray-300 rounded focus:ring-frappe-blue-500"
          {...props}
        />
        <label htmlFor={id} className="ml-2 block text-sm text-frappe-gray-900">
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Checkbox;
