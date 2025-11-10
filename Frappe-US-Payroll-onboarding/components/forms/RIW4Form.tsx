
import React, { useState, useEffect } from 'react';
import { RI_W4_FormData } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';

interface Props {
  data: RI_W4_FormData;
  onChange?: (data: RI_W4_FormData) => void;
  onSave?: (data: RI_W4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof RI_W4_FormData, string>>;
}

const RIW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<RI_W4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: RI_W4_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
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
    if (onSave) onSave(formData);
  };

  const filingStatuses = {
    single: 'Single',
    married_jointly: 'Married filing jointly',
    married_separately: 'Married filing separately',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Rhode Island Form RI W-4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Allowance Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Filing Status & Allowances</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange} error={errors?.filingStatus}>
                    {Object.entries(filingStatuses).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                  </Select>
              </div>
              <div className="sm:col-span-3">
                  <Input id="allowances" name="allowances" type="number" label="Total Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Additional Withholding & Exemption</h3>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional amount to withhold" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
          </div>
          <div className="mt-6 space-y-4">
              <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding." checked={!!formData.isExempt} onChange={handleChange} />
              {formData.isExempt && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., Expect no RI tax liability"/>
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

export default RIW4Form;
