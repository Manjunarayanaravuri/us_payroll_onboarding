
import React, { useState, useEffect } from 'react';
import { CT_W4_FormData, CTFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

interface Props {
  data: CT_W4_FormData;
  onChange?: (data: CT_W4_FormData) => void;
  onSave?: (data: CT_W4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof CT_W4_FormData, string>>;
}

const CTW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<CT_W4_FormData>(data);

  useEffect(() => { setFormData(data); }, [data]);

  const updateState = (updatedData: CT_W4_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // FIX: Removed incorrect type assertion. This generic handler now works correctly with the updated types.
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
            <h2 className="text-xl font-bold text-gray-900">Connecticut Form CT-W4</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Withholding Code</h3>
          <div className="mt-6 sm:col-span-4 space-y-4">
              <Select id="withholdingCode" name="withholdingCode" label="Select your Withholding Code" value={formData.withholdingCode} onChange={handleChange} error={errors?.withholdingCode}>
                {Object.entries(CTFilingStatus).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
              </Select>
               {formData.withholdingCode === 'E' && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., No CT income tax liability expected"/>
              )}
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

export default CTW4Form;
