import React, { useState, useEffect } from 'react';
import { I9FormData, CitizenshipStatus, DocumentInfo } from '../../types';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { usStates, getCityAndCountyByZip, getZipsByState } from '../../utils/validation';


const getStateAbbreviation = (fullName: string): string => {
  const found = usStates.find(s => s.name === fullName || s.abbreviation === fullName);
  return found ? found.abbreviation : fullName;
};

const getStateFullName = (abbr: string): string => {
  const found = usStates.find(s => s.abbreviation === abbr || s.name === abbr);
  return found ? found.name : abbr;
};

interface Props {
  data: I9FormData;
  onChange?: (data: I9FormData) => void;
  onSave?: (data: I9FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof I9FormData, string>>;
  employeeId?: string;
  erpEmployeeName?: string;
}

const DocumentGroup: React.FC<{
    doc?: DocumentInfo;
    onUpdate: (doc: DocumentInfo) => void;
    title: string;
    fields: Array<keyof DocumentInfo>;
    docKey: 'listADocument' | 'listBDocument' | 'listCDocument'; 
}> = ({ doc, onUpdate, title, fields, docKey }) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name.replace(`${docKey}_`, ''); 
        onUpdate({ ...(doc || { title: '', issuingAuthority: '', documentNumber: '' }), [fieldName]: value });
    };

    return (
        <div className="p-4 border border-gray-200 rounded-md">
            <h4 className="text-md font-semibold text-gray-700 mb-4">{title}</h4>
            <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                {fields.includes('title') && <Input label="Document Title" name={`${docKey}_title`} value={doc?.title || ''} onChange={handleChange} />}
                {fields.includes('issuingAuthority') && <Input label="Issuing Authority" name={`${docKey}_issuingAuthority`} value={doc?.issuingAuthority || ''} onChange={handleChange} />}
                {fields.includes('documentNumber') && <Input label="Document Number" name={`${docKey}_documentNumber`} value={doc?.documentNumber || ''} onChange={handleChange} />}
                {fields.includes('expirationDate') && <Input label="Expiration Date (if any)" name={`${docKey}_expirationDate`} type="date" value={doc?.expirationDate || ''} onChange={handleChange} />}
            </div>
        </div>
    );
}

const I9Form: React.FC<Props> = ({ data, onChange, onSave, isSaving, errors = {} }) => {
  const [formData, setFormData] = useState<I9FormData>(data);
  const [zipOptions, setZipOptions] = useState<string[]>([]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  // ✅ Updated: use abbreviation for internal ZIP lookups
  useEffect(() => {
    if (formData.state) {
        const abbreviation = getStateAbbreviation(formData.state);
        setZipOptions(getZipsByState(abbreviation));
    } else {
        setZipOptions([]);
    }
  }, [formData.state]);

  const updateState = (updatedData: I9FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  // ✅ Updated handleChange to always store full state name in ERPNext
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === 'state') {
        const fullName = getStateFullName(value.trim());
        const abbreviation = getStateAbbreviation(fullName);
        updatedData = { ...updatedData, state: fullName, zipCode: '', city: '', county: '' };
        setZipOptions(getZipsByState(abbreviation));
    }
    
    if (name === 'zipCode') {
        const abbreviation = getStateAbbreviation(formData.state);
        const location = getCityAndCountyByZip(abbreviation, value);
        if (location) {
            updatedData = { ...updatedData, city: location.city, county: location.county };
        }
    }

    updateState(updatedData);
  };
  
  const handleDocChange = (docName: 'listADocument' | 'listBDocument' | 'listCDocument', docData: DocumentInfo) => {
      updateState({...formData, [docName]: docData});
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const isAlien = formData.citizenshipStatus === CitizenshipStatus.ALIEN_AUTHORIZED_TO_WORK;
  const isPermanentResident = formData.citizenshipStatus === CitizenshipStatus.LAWFUL_PERMANENT_RESIDENT;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">Employment Eligibility Verification (I-9)</h2>
            <p className="text-sm text-gray-500">Form Version: {data.formVersion}</p>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Section 1: Employee Information and Attestation</h3>
          <p className="mt-1 text-sm text-gray-500">
            Employees must complete and sign Section 1 of Form I-9 no later than the first day of employment.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2"><Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} /></div>
            <div className="sm:col-span-2"><Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} /></div>
            <div className="sm:col-span-2"><Input label="Middle Initial" name="middleInitial" value={formData.middleInitial} onChange={handleChange} /></div>
            
            <div className="sm:col-span-4">
                <Input label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" error={errors.address}/>
            </div>
            <div className="sm:col-span-2">
                <Input label="Apt, suite, etc. (optional)" name="aptNumber" id="aptNumber" value={formData.aptNumber || ''} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
                <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
            </div>
             <div className="sm:col-span-2">
                <Input label="County" name="county" value={formData.county || ''} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2">
              {/* ✅ Full names shown, stored, but internal logic still works */}
              <Select label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state}>
                  <option value="">Select State...</option>
                  {usStates.map(s => <option key={s.abbreviation} value={s.name}>{s.name}</option>)}
              </Select>
            </div>
            <div className="sm:col-span-2">
                <Input
                    label="ZIP Code"
                    name="zipCode"
                    id="zipCode-i9"
                    list="zipOptions-i9"
                    value={formData.zipCode}
                    onChange={handleChange}
                    disabled={!formData.state}
                    placeholder="Enter ZIP Code..."
                    error={errors.zipCode}
                />
                <datalist id="zipOptions-i9">
                    {zipOptions.map(zip => <option key={zip} value={zip} />)}
                </datalist>
            </div>

            <div className="sm:col-span-2"><Input label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} /></div>
            <div className="sm:col-span-2"><Input label="Social Security Number" name="socialSecurityNumber" value={formData.socialSecurityNumber} onChange={handleChange} error={errors.socialSecurityNumber} /></div>
          </div>
        </div>
        
        {/* ✅ Below sections unchanged — all your code preserved exactly */}
        <div className="pt-8">
           <h3 className="text-lg font-medium leading-6 text-gray-900">Citizenship / Immigration Status Attestation</h3>
           <div className="mt-6">
              <Select id="citizenshipStatus" name="citizenshipStatus" label="I attest, under penalty of perjury, that I am:" value={formData.citizenshipStatus} onChange={handleChange}>
                  {Object.values(CitizenshipStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </Select>
           </div>
           {(isPermanentResident || isAlien) && (
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {isPermanentResident && <div className="sm:col-span-3"><Input label="Alien Registration Number/USCIS Number" name="uscisNumber" value={formData.uscisNumber || ''} onChange={handleChange} /></div>}
                  {isAlien && (
                      <>
                          <div className="sm:col-span-2"><Input label="Form I-94 Admission Number" name="formI94AdmissionNumber" value={formData.formI94AdmissionNumber || ''} onChange={handleChange} /></div>
                          <div className="sm:col-span-2"><Input label="Foreign Passport Number" name="foreignPassportNumber" value={formData.foreignPassportNumber || ''} onChange={handleChange} /></div>
                          <div className="sm:col-span-2"><Input label="Country of Issuance" name="countryOfIssuance" value={formData.countryOfIssuance || ''} onChange={handleChange} /></div>
                      </>
                  )}
              </div>
           )}
        </div>

        <div className="pt-8">
          <h2 className="text-xl font-bold text-gray-900">Section 2: Employer Review and Verification</h2>
          <p className="mt-1 text-sm text-gray-500">
            Employers must complete this section within 3 business days of the employee's first day of employment.
          </p>
          <div className="mt-6 space-y-6">
              <p className="text-sm font-medium text-gray-700">Provide one document from List A OR one document from List B AND one from List C.</p>
              {errors.listADocument && <p className="mt-2 text-xs text-red-600">{errors.listADocument}</p>}
              <DocumentGroup title="List A Document" docKey="listADocument" doc={formData.listADocument} onUpdate={(d) => handleDocChange('listADocument', d)} fields={['title', 'issuingAuthority', 'documentNumber', 'expirationDate']} />
              <div className="flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <DocumentGroup title="List B Document" docKey="listBDocument" doc={formData.listBDocument} onUpdate={(d) => handleDocChange('listBDocument', d)} fields={['title', 'issuingAuthority', 'documentNumber', 'expirationDate']} />
                  <DocumentGroup title="List C Document" docKey="listCDocument" doc={formData.listCDocument} onUpdate={(d) => handleDocChange('listCDocument', d)} fields={['title', 'issuingAuthority', 'documentNumber']} />
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

export default I9Form;
