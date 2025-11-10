
import React, { useState, useEffect } from 'react';
import { KY_K4_FormData } from '../../types';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface Props {
  data: KY_K4_FormData;
  onChange?: (data: KY_K4_FormData) => void;
  onSave?: (data: KY_K4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof KY_K4_FormData, string>>;
}

const KYK4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<KY_K4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: KY_K4_FormData) => {
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
            <h2 className="text-xl font-bold text-gray-900">Kentucky Form K-4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Exemption Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Allowances</h3>
          <div className="mt-6 sm:col-span-3">
              <Input id="allowances" name="allowances" type="number" label="Total Kentucky Withholding Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} />
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Local Tax & Additional Withholding</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Input id="localTaxJurisdiction" name="localTaxJurisdiction" label="Local Government (City or County)" value={formData.localTaxJurisdiction || ''} onChange={handleChange} error={errors?.localTaxJurisdiction} />
              </div>
              <div className="sm:col-span-3">
                  <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional amount to withhold" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
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

export default KYK4Form;
