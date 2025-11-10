
import React, { useState, useEffect } from 'react';
import { MO_W4_FormData } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
  data: MO_W4_FormData;
  onChange?: (data: MO_W4_FormData) => void;
  onSave?: (data: MO_W4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof MO_W4_FormData, string>>;
}

const MOW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<MO_W4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: MO_W4_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value as MO_W4_FormData['filingStatus'] });
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
    married_jointly: 'Married filing combined',
    married_separately: 'Married filing separate',
    head_of_household: 'Head of Household'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Missouri Form MO W-4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Certificate for Tax Year: {data.formYear}</p>
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
                  <Input id="allowances" name="allowances" type="number" label="Total Withholding Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Additional Withholding</h3>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional amount to withhold" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
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

export default MOW4Form;
