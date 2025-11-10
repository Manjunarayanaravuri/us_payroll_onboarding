
import React, { useState, useEffect } from 'react';
import { IN_WH4_FormData } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { getZipsByState, getCityAndCountyByZip } from '../../utils/validation';

interface Props {
  data: IN_WH4_FormData;
  onChange?: (data: IN_WH4_FormData) => void;
  onSave?: (data: IN_WH4_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof IN_WH4_FormData, string>>;
}

const INWH4Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<IN_WH4_FormData>(data);
  const [zipOptions, setZipOptions] = useState<string[]>([]);

  useEffect(() => {
    setFormData(data);
  }, [data]);
  
  useEffect(() => {
    setZipOptions(getZipsByState('IN'));
  }, []);

  const updateState = (updatedData: IN_WH4_FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;

    let updatedData = {
      ...formData,
      [name]: isCheckbox ? checked : value,
    };

    if (name === 'residenceZipCode') {
        const location = getCityAndCountyByZip('IN', value);
        if (location) {
            updatedData.countyOfResidence = location.county;
        }
    } else if (name === 'workZipCode') {
        const location = getCityAndCountyByZip('IN', value);
        if (location) {
            updatedData.countyOfPrincipalWork = location.county;
        }
    }
    
    updateState(updatedData);
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateState({ ...formData, [name]: value === '' ? 0 : parseInt(value, 10) });
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
            <h2 className="text-xl font-bold text-gray-900">Indiana WH-4 - Employee's Withholding Allowance Certificate</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <p className="text-sm text-gray-600">Complete this form so that your employer can withhold the correct amount of state and county income tax from your pay.</p>
        </div>

        <div className="pt-8">
            <h3 className="text-lg font-medium text-gray-900">Exemptions</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                    <Input id="personalExemptions" name="personalExemptions" type="number" label="Personal Exemptions" value={formData.personalExemptions} onChange={handleNumberChange} error={errors?.personalExemptions} helperText="Claim 1 for yourself, 1 for spouse." />
                </div>
                <div className="sm:col-span-2">
                    <Input id="dependentExemptions" name="dependentExemptions" type="number" label="Dependent Exemptions" value={formData.dependentExemptions} onChange={handleNumberChange} error={errors?.dependentExemptions} helperText="Claim for each dependent." />
                </div>
                <div className="sm:col-span-2">
                    <Input id="additionalExemptions" name="additionalExemptions" type="number" label="Additional Exemptions" value={formData.additionalExemptions} onChange={handleNumberChange} error={errors?.additionalExemptions} helperText="Age 65+, blind, etc." />
                </div>
            </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">County Information (as of January 1)</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                   <Input
                       id="residenceZipCode"
                       name="residenceZipCode"
                       label="Residence ZIP Code"
                       value={formData.residenceZipCode || ''}
                       onChange={handleChange}
                       list="zipOptions-in"
                       placeholder="Enter ZIP Code..."
                       error={errors?.residenceZipCode}
                   />
                   <datalist id="zipOptions-in">
                       {zipOptions.map(zip => <option key={`res-zip-${zip}`} value={zip} />)}
                   </datalist>
              </div>
              <div className="sm:col-span-3">
                   <Input id="countyOfResidence" name="countyOfResidence" label="County of Residence" value={formData.countyOfResidence} onChange={handleChange} error={errors?.countyOfResidence} />
              </div>
              <div className="sm:col-span-3">
                   <Input
                        id="workZipCode"
                        name="workZipCode"
                        label="Work ZIP Code"
                        value={formData.workZipCode || ''}
                        onChange={handleChange}
                        list="zipOptions-in"
                        placeholder="Enter ZIP Code..."
                        error={errors?.workZipCode}
                   />
              </div>
              <div className="sm:col-span-3">
                   <Input id="countyOfPrincipalWork" name="countyOfPrincipalWork" label="County of Principal Work" value={formData.countyOfPrincipalWork} onChange={handleChange} error={errors?.countyOfPrincipalWork} />
              </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h3 className="text-lg font-medium text-gray-900">Additional Withholding & Exemption</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
            <div className="sm:col-span-3">
                <Input id="additionalWithholding" name="additionalWithholding" type="number" label="Additional Withholding per Pay Period" prefix="$" value={formData.additionalWithholding} onChange={handleNumberChange} error={errors?.additionalWithholding} />
            </div>
            <div className="space-y-4 mt-4">
                <Checkbox id="isExempt" name="isExempt" label="I claim exemption from withholding." checked={formData.isExempt} onChange={handleChange} />
                {formData.isExempt && (
                    <Input id="exemptionReason" name="exemptionReason" label="Reason for Exemption" value={formData.exemptionReason || ''} onChange={handleChange} placeholder="e.g., Expect no state tax liability"/>
                )}
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

export default INWH4Form;
