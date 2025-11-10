
import React, { useState, useEffect } from 'react';
import { MS_89350_FormData, MSFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
  data: MS_89350_FormData;
  onChange?: (data: MS_89350_FormData) => void;
  onSave?: (data: MS_89350_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof MS_89350_FormData, string>>;
}

const MS89350Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<MS_89350_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: MS_89350_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value as MSFilingStatus });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value === '' ? 0 : parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Mississippi Form 89-350</h2>
            <p className="text-sm text-gray-500">Withholding Exemption Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Filing Status & Exemptions</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Select id="filingStatus" name="filingStatus" label="Marital Status" value={formData.filingStatus} onChange={handleChange} error={errors?.filingStatus}>
                    {Object.values(MSFilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
                  </Select>
              </div>
              <div className="sm:col-span-3">
                  <Input id="exemptions" name="exemptions" type="number" label="Total Number of Exemptions" value={formData.exemptions} onChange={handleNumberChange} error={errors?.exemptions} />
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

export default MS89350Form;
