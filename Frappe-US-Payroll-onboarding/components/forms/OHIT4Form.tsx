
import React, { useState, useEffect } from 'react';
import { OH_IT4_FormData } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  data: OH_IT4_FormData;
  onChange?: (data: OH_IT4_FormData) => void;
  onSave?: (data: OH_IT4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof OH_IT4_FormData, string>>;
}

const OHIT4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<OH_IT4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: OH_IT4_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value });
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
            <h2 className="text-xl font-bold text-gray-900">Ohio Form IT 4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Exemption Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Exemptions & School District</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Input id="exemptions" name="exemptions" type="number" label="Total Exemptions" value={formData.exemptions} onChange={handleNumberChange} error={errors?.exemptions} />
              </div>
              <div className="sm:col-span-3">
                  <Input id="schoolDistrictNumber" name="schoolDistrictNumber" label="School District Number" value={formData.schoolDistrictNumber} onChange={handleChange} error={errors?.schoolDistrictNumber} />
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

export default OHIT4Form;
