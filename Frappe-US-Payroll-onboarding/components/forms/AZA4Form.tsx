
import React, { useState, useEffect } from 'react';
import { AZ_A4_FormData } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
  data: AZ_A4_FormData;
  onChange?: (data: AZ_A4_FormData) => void;
  onSave?: (data: AZ_A4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof AZ_A4_FormData, string>>;
}

const AZA4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<AZ_A4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: AZ_A4_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value as AZ_A4_FormData['withholdingRate'] });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value === '' ? 0 : parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  const withholdingRates: AZ_A4_FormData['withholdingRate'][] = ['0.8', '1.3', '1.8', '2.7', '3.6', '4.2', '0'];

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Arizona Form A-4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Withholding Rate</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Select id="withholdingRate" name="withholdingRate" label="Withholding Percentage Rate" value={formData.withholdingRate} onChange={handleChange} error={errors?.withholdingRate}>
                    {withholdingRates.map(rate => 
                        <option key={rate} value={rate}>
                            {rate === '0' ? '0% (Claiming exempt)' : `${rate}%`}
                        </option>
                    )}
                  </Select>
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Additional Withholding</h3>
          <div className="mt-6 sm:col-span-3">
            <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional amount, if any, you want withheld" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
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

export default AZA4Form;
