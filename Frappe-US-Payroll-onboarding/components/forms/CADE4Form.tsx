
import React, { useState, useEffect } from 'react';
import { CA_DE4_FormData, CAFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
  data: CA_DE4_FormData;
  onChange?: (data: CA_DE4_FormData) => void;
  onSave?: (data: CA_DE4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof CA_DE4_FormData, string>>;
}

const CADE4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<CA_DE4_FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: CA_DE4_FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateState({
      ...formData,
      [name]: value,
    });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value === '' ? 0 : parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">California DE 4 - Employee's Withholding Allowance Certificate</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange} error={errors?.filingStatus}>
                {Object.values(CAFilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </Select>
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Allowances</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Input id="totalAllowances" name="totalAllowances" type="number" label="Total Allowances" value={formData.totalAllowances} onChange={handleNumberChange} helperText="From Worksheet A and B" error={errors?.totalAllowances} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Additional Withholding</h2>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional amount, if any, you want withheld from each paycheck" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
          </div>
        </div>
      </div>
      {onSave && (
        <div className="pt-8 flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Submitting...' : 'Submit New Version'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default CADE4Form;