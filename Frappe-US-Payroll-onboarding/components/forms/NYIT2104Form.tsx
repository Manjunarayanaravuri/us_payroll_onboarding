
import React, { useState, useEffect } from 'react';
import { NY_IT2104_FormData, NYFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface Props {
  data: NY_IT2104_FormData;
  onChange?: (data: NY_IT2104_FormData) => void;
  onSave?: (data: NY_IT2104_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof NY_IT2104_FormData, string>>;
}

const NYIT2104Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<NY_IT2104_FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: NY_IT2104_FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;
    
    updateState({
      ...formData,
      [name]: isCheckbox ? checked : value,
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
              <h2 className="text-xl font-bold text-gray-900">New York State (IT-2104)</h2>
              <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
           </div>
          <h3 className="text-lg font-medium text-gray-900">Part 1: Personal Information and Filing Status</h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange}>
                {Object.values(NYFilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </Select>
            </div>
            <div className="sm:col-span-3">
              <Input id="totalAllowances" name="totalAllowances" type="number" label="Total Allowances" value={formData.totalAllowances} onChange={handleNumberChange} error={errors?.totalAllowances} />
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Part 2: New York City and Yonkers</h2>
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-8">
              <Checkbox id="isNYCResident" name="isNYCResident" label="Are you a resident of New York City?" checked={formData.isNYCResident} onChange={handleChange} />
              {formData.isNYCResident && (
                <div className="w-48">
                  <Input id="nycAllowances" name="nycAllowances" type="number" label="NYC Allowances" value={formData.nycAllowances} onChange={handleNumberChange} error={errors?.nycAllowances} />
                </div>
              )}
            </div>
            <div className="flex items-center space-x-8">
              <Checkbox id="isYonkersResident" name="isYonkersResident" label="Are you a resident of Yonkers?" checked={formData.isYonkersResident} onChange={handleChange} />
              {formData.isYonkersResident && (
                <div className="w-48">
                  <Input id="yonkersAllowances" name="yonkersAllowances" type="number" label="Yonkers Allowances" value={formData.yonkersAllowances} onChange={handleNumberChange} error={errors?.yonkersAllowances} />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Part 3: Additional Withholding</h2>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional Withholding per Pay Period" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
          </div>
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Part 4: Exemption from Withholding</h2>
          <div className="mt-6 space-y-4">
              <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding of New York State, New York City, and Yonkers taxes." checked={!!formData.isExempt} onChange={handleChange} />
              {formData.isExempt && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., I meet the conditions for exemption."/>
              )}
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

export default NYIT2104Form;
