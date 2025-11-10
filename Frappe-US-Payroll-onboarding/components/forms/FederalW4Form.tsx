import React, { useState, useEffect } from 'react';
import { FederalW4FormData, FilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface Props {
  data: FederalW4FormData;
  onChange?: (data: FederalW4FormData) => void;
  onSave?: (data: FederalW4FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof FederalW4FormData, string>>;
}

const FederalW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors = {} }) => {
  const [formData, setFormData] = useState<FederalW4FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: FederalW4FormData) => {
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
            <h2 className="text-xl font-bold text-gray-900">Employee's Withholding Certificate (W-4)</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Step 1: Enter Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
               <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange}>
                  {Object.values(FilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
               </Select>
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Step 2: Multiple Jobs or Spouse Works</h2>
          <div className="mt-6">
              <Checkbox id="multipleJobs" name="multipleJobs" label="Check if you hold more than one job at a time or are married filing jointly and your spouse also works." checked={formData.multipleJobs} onChange={handleChange} />
          </div>
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Step 3: Claim Dependents</h2>
           <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
               <Input id="qualifyingChildrenAmount" name="qualifyingChildrenAmount" type="number" label="Qualifying Children under age 17" prefix="$" value={formData.qualifyingChildrenAmount} onChange={handleNumberChange} helperText="Multiply the number of children by $2,000" error={errors.qualifyingChildrenAmount} />
            </div>
             <div className="sm:col-span-3">
               <Input id="otherDependentsAmount" name="otherDependentsAmount" type="number" label="Other Dependents" prefix="$" value={formData.otherDependentsAmount} onChange={handleNumberChange} helperText="Multiply the number of other dependents by $500" error={errors.otherDependentsAmount} />
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Step 4: Other Adjustments</h2>
           <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
               <Input id="otherIncome" name="otherIncome" type="number" label="Other Income (not from jobs)" prefix="$" value={formData.otherIncome} onChange={handleNumberChange} error={errors.otherIncome} />
            </div>
             <div className="sm:col-span-2">
               <Input id="deductions" name="deductions" type="number" label="Deductions" prefix="$" value={formData.deductions} onChange={handleNumberChange} error={errors.deductions} />
            </div>
              <div className="sm:col-span-2">
               <Input id="extraWithholding" name="extraWithholding" type="number" label="Extra Withholding" prefix="$" value={formData.extraWithholding} onChange={handleNumberChange} error={errors.extraWithholding} />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Exemption From Withholding</h2>
          <div className="mt-6 space-y-4">
              <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding for the year." checked={formData.isExempt} onChange={handleChange} />
              {formData.isExempt && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., I meet both of the conditions for exemption."/>
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

export default FederalW4Form;