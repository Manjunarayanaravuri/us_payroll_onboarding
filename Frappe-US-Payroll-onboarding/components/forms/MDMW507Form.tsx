
import React, { useState, useEffect } from 'react';
import { MD_MW507_FormData } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { getZipsByState, getCityAndCountyByZip } from '../../utils/validation';

interface Props {
  data: MD_MW507_FormData;
  onChange?: (data: MD_MW507_FormData) => void;
  onSave?: (data: MD_MW507_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof MD_MW507_FormData, string>>;
}

const MDMW507Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<MD_MW507_FormData>(data);
  const [zipOptions, setZipOptions] = useState<string[]>([]);

  useEffect(() => { setFormData(data); }, [data]);
  
  useEffect(() => {
    setZipOptions(getZipsByState('MD'));
  }, []);

  const updateState = (updatedData: MD_MW507_FormData) => {
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'residenceZipCode') {
        const location = getCityAndCountyByZip('MD', value);
        if (location) {
            updatedData.countyOfResidence = location.county;
        }
    }
    updateState(updatedData);
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
    married_jointly: 'Married (jointly)',
    married_separately: 'Married (separately)',
    head_of_household: 'Head of Household'
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Maryland Form MW507</h2>
            <p className="text-sm text-gray-500">Employee's Withholding Exemption Certificate for Tax Year: {data.formYear}</p>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Filing Status & Exemptions</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                  <Select id="filingStatus" name="filingStatus" label="Filing Status" value={formData.filingStatus} onChange={handleChange} error={errors?.filingStatus}>
                    {Object.entries(filingStatuses).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                  </Select>
              </div>
              <div className="sm:col-span-3">
                  <Input id="exemptions" name="exemptions" type="number" label="Total Exemptions Claimed" value={formData.exemptions} onChange={handleNumberChange} error={errors?.exemptions} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">County & Additional Withholding</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                   <Input
                        id="residenceZipCode"
                        name="residenceZipCode"
                        label="Residence ZIP Code"
                        value={formData.residenceZipCode || ''}
                        onChange={handleChange}
                        list="zipOptions-md"
                        placeholder="Enter ZIP Code..."
                        error={errors?.residenceZipCode}
                   />
                   <datalist id="zipOptions-md">
                        {zipOptions.map(zip => <option key={zip} value={zip} />)}
                   </datalist>
              </div>
              <div className="sm:col-span-3">
                <Input id="countyOfResidence" name="countyOfResidence" label="County of Residence" value={formData.countyOfResidence} onChange={handleChange} error={errors?.countyOfResidence} />
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

export default MDMW507Form;
