
import React, { useState, useEffect } from 'react';
import { CO_DR0004_FormData } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  data: CO_DR0004_FormData;
  onChange?: (data: CO_DR0004_FormData) => void;
  onSave?: (data: CO_DR0004_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof CO_DR0004_FormData, string>>;
}

const CODR0004Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<CO_DR0004_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: CO_DR0004_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
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
            <h2 className="text-xl font-bold text-gray-900">Colorado Form DR 0004</h2>
            <p className="text-sm text-gray-500">Employee Withholding Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Allowances & Adjustments</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Input id="allowances" name="allowances" type="number" label="Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} />
              </div>
              <div className="sm:col-span-3">
                  <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional Amount" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
              </div>
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

export default CODR0004Form;
