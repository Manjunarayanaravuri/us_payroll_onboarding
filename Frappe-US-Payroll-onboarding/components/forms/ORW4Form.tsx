
import React, { useState, useEffect } from 'react';
import { OR_W4_FormData, ORFilingStatus } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface Props {
  data: OR_W4_FormData;
  onChange?: (data: OR_W4_FormData) => void;
  onSave?: (data: OR_W4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof OR_W4_FormData, string>>;
}

const ORW4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<OR_W4_FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: OR_W4_FormData) => {
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
            <h2 className="text-xl font-bold text-gray-900">Oregon Form OR-W-4 - Employee's Withholding Statement and Exemption Certificate</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <p className="text-sm text-gray-600">Complete this form so that your employer can withhold the correct amount of state income tax from your pay.</p>
        </div>

        <div className="pt-8">
            <h3 className="text-lg font-medium text-gray-900">Filing Status and Allowances</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange} error={errors?.filingStatus}>
                        {Object.values(ORFilingStatus).map(status => <option key={status} value={status}>{status}</option>)}
                    </Select>
                </div>
                <div className="sm:col-span-3">
                    <Input id="allowances" name="allowances" type="number" label="Total Allowances" value={formData.allowances} onChange={handleNumberChange} error={errors?.allowances} helperText="From the worksheets on the official form." />
                </div>
            </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Other Adjustments</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                   <Input id="nonwageIncome" name="nonwageIncome" type="number" label="Nonwage Income" prefix="$" value={formData.nonwageIncome} onChange={handleNumberChange} error={errors?.nonwageIncome} />
              </div>
              <div className="sm:col-span-2">
                   <Input id="deductions" name="deductions" type="number" label="Deductions" prefix="$" value={formData.deductions} onChange={handleNumberChange} error={errors?.deductions} />
              </div>
               <div className="sm:col-span-2">
                <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional Withholding" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Exemption from Withholding</h3>
          <div className="mt-6 space-y-4">
            <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding (see instructions)." checked={formData.isExempt} onChange={handleChange} />
            <Checkbox id="isExemptForMilitarySpouse" name="isExemptForMilitarySpouse" label="I claim exemption under the Military Spouses Residency Relief Act." checked={formData.isExemptForMilitarySpouse} onChange={handleChange} />
            {(formData.isExempt || formData.isExemptForMilitarySpouse) && (
                <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., MSRRA or expect no tax liability"/>
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

export default ORW4Form;
