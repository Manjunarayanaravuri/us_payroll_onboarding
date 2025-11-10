import React, { useState, useEffect } from 'react';
import { FederalW9FormData, FederalTaxClassification } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { usStates, getCityAndCountyByZip, getZipsByState } from '../../utils/validation';

interface Props {
  data: FederalW9FormData;
  onChange?: (data: FederalW9FormData) => void;
  onSave?: (data: FederalW9FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof FederalW9FormData, string>>;
}

const FederalW9Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors = {} }) => {
  const [formData, setFormData] = useState<FederalW9FormData>(data);
  const [zipOptions, setZipOptions] = useState<string[]>([]);

  useEffect(() => {
    setFormData(data);
  }, [data]);
  
  useEffect(() => {
    if (formData.state) {
        setZipOptions(getZipsByState(formData.state));
    } else {
        setZipOptions([]);
    }
  }, [formData.state]);


  const updateState = (updatedData: FederalW9FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'state') {
        updatedData = { ...updatedData, zip: '', city: '', county: '' };
    }
    
    if (name === 'zip') {
        const location = getCityAndCountyByZip(updatedData.state, value);
        if (location) {
            updatedData = { ...updatedData, city: location.city, county: location.county };
        }
    }
    
    // Combine name fields for legacy `name` property
    if (['firstName', 'lastName', 'middleInitial'].includes(name)) {
        const { firstName = '', lastName = '', middleInitial = '' } = updatedData;
        updatedData.name = `${firstName} ${middleInitial} ${lastName}`.replace(/\s+/g, ' ').trim();
    }

    updateState(updatedData);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };
  
  const isIndividual = formData.taxClassification === FederalTaxClassification.INDIVIDUAL;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Request for Taxpayer Identification Number and Certification (W-9)</h2>
             <p className="text-sm text-gray-500">Form Version: {data.formVersion}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Part I: Taxpayer Information</h3>
          <p className="mt-1 text-sm text-gray-500">Enter your information as it appears on your tax return.</p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            
            {isIndividual ? (
              <>
                <div className="sm:col-span-2"><Input label="1. First Name" name="firstName" value={formData.firstName || ''} onChange={handleChange} required error={errors.firstName} /></div>
                <div className="sm:col-span-2"><Input label="1. Last Name" name="lastName" value={formData.lastName || ''} onChange={handleChange} required error={errors.lastName} /></div>
                <div className="sm:col-span-2"><Input label="1. Middle Initial" name="middleInitial" value={formData.middleInitial || ''} onChange={handleChange} /></div>
              </>
            ) : (
               <div className="sm:col-span-6">
                  <Input label="1. Name (as shown on your income tax return)" name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
              </div>
            )}

            <div className="sm:col-span-6">
                <Input label="2. Business name/disregarded entity name, if different" name="businessName" value={formData.businessName || ''} onChange={handleChange} />
            </div>
            <div className="sm:col-span-6">
                <Select label="3. Federal tax classification" name="taxClassification" value={formData.taxClassification} onChange={handleChange}>
                    {Object.values(FederalTaxClassification).map(status => <option key={status} value={status}>{status}</option>)}
                </Select>
            </div>
             <div className="sm:col-span-6">
                <Input
                    id="address"
                    label="5. Address (number, street, and apt. or suite no.)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address..."
                    error={errors.address}
                />
            </div>
            <div className="sm:col-span-3">
                <Input label="6. City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            </div>
            <div className="sm:col-span-3">
                <Input label="County" name="county" value={formData.county || ''} onChange={handleChange} />
            </div>
            <div className="sm:col-span-3">
               <Select label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state}>
                  <option value="">Select State...</option>
                  {usStates.map(s => <option key={s.abbreviation} value={s.abbreviation}>{s.name}</option>)}
              </Select>
            </div>
            <div className="sm:col-span-3">
                <Input
                    label="ZIP code"
                    name="zip"
                    id="zip-w9"
                    list="zipOptions-w9"
                    value={formData.zip}
                    onChange={handleChange}
                    disabled={!formData.state}
                    placeholder="Enter ZIP Code..."
                    error={errors.zip}
                />
                <datalist id="zipOptions-w9">
                    {zipOptions.map(zip => <option key={zip} value={zip} />)}
                </datalist>
            </div>
             <div className="sm:col-span-6">
                <Input label="7. Requester's name and address (optional)" name="requesterNameAndAddress" value={formData.requesterNameAndAddress || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Part II: Taxpayer Identification Number (TIN)</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <Input label="Social Security Number (SSN)" name="ssn" value={formData.ssn || ''} onChange={handleChange} error={errors.ssn} />
            </div>
             <div className="sm:col-span-1">
              <Input label="Employer ID Number (EIN)" name="ein" value={formData.ein || ''} onChange={handleChange} error={errors.ein} />
            </div>
            {!isIndividual && (
                <div className="sm:col-span-1">
                    <Input label="Federal EIN (FEIN) (Optional)" name="fein" value={formData.fein || ''} onChange={handleChange} />
                </div>
            )}
          </div>
        </div>
        
        <div className="pt-8">
            <h2 className="text-xl font-bold text-gray-900">Part III: Certification</h2>
            <div className="mt-6 space-y-4 text-sm text-gray-600">
                <p>Under penalties of perjury, I certify that:</p>
                <ol className="list-decimal list-inside space-y-2">
                    <li>The number shown on this form is my correct taxpayer identification number.</li>
                    <li>I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding.</li>
                    <li>I am a U.S. citizen or other U.S. person.</li>
                    <li>The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct.</li>
                </ol>
                <p><span className="font-semibold">Certification instructions.</span> You must cross out item 2 above if you have been notified by the IRS that you are currently subject to backup withholding because you have failed to report all interest and dividends on your tax return.</p>
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

export default FederalW9Form;