
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, id, children, error, ...props }) => {
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-frappe-gray-300 focus:outline-none focus:ring-frappe-blue-500 focus:border-frappe-blue-500';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-frappe-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`block w-full pl-3 pr-10 py-2 text-base border sm:text-sm rounded-md ${errorClasses}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
