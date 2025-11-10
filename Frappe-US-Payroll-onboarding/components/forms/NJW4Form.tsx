
import React, { useState, useEffect } from 'react';
import { NJ_W4_FormData, NJFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

interface Props {
  data: NJ_W4_FormData;
  onChange?: (data: NJ_W4_FormData) => void;
  onSave?: (data: NJ_W4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof NJ_W4_FormData, string>>;
}

const NJW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<NJ_W4_FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: NJ_W4_FormData) => {
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
            <h2 className="text-xl font-bold text-gray-900">New Jersey W-4</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Step 1: Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange}>
                {Object.values(NJFilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </Select>
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Step 2: Withholding Rate and Allowances</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                   <Select id="withholdingRate" name="withholdingRate" label="Withholding Rate" value={formData.withholdingRate} onChange={handleChange}>
                      <option value="A">Rate A</option>
                      <option value="B">Rate B</option>
                      <option value="C">Rate C</option>
                      <option value="D">Rate D</option>
                      <option value="E">Rate E</option>
                  </Select>
                  <p className="mt-1 text-xs text-frappe-gray-500">Refer to the state's official NJ-W4 form instructions for guidance on selecting the appropriate withholding rate.</p>
              </div>
              <div className="sm:col-span-3">
                  <Input id="allowances" name="allowances" type="number" label="Total Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Step 3: Additional Withholding & Exemption</h2>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional Withholding per Pay Period" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
          </div>
          <div className="mt-6 space-y-4">
             <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding." checked={formData.isExempt} onChange={handleChange} />
             {formData.isExempt && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., Student, Military Spouse"/>
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

export default NJW4Form;
