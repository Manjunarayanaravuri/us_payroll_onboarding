import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  prefix?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, id, helperText, prefix, error, readOnly, ...props }, ref) => {
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-frappe-gray-300 focus:ring-frappe-blue-500 focus:border-frappe-blue-500';
  const readOnlyClasses = readOnly ? 'bg-frappe-gray-100 cursor-not-allowed' : '';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-frappe-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-frappe-gray-500 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          id={id}
          ref={ref}
          readOnly={readOnly}
          className={`block w-full px-3 py-2 border rounded-md sm:text-sm ${errorClasses} ${readOnlyClasses} ${prefix ? 'pl-7' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && helperText && <p className="mt-1 text-xs text-frappe-gray-500">{helperText}</p>}
    </div>
  );
});

export default Input;