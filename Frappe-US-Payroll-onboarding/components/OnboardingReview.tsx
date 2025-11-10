
import React from 'react';
import { Employee, CTFilingStatus } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import { EditIcon } from './icons/Icon';

interface Step {
    id: string;
    name: string;
    formKey: keyof Employee['taxForms'] | null;
}
interface Props {
  employee: Employee;
  formData: { [key: string]: any };
  onEdit: (stepIndex: number) => void;
  steps: Step[];
}

const ReviewSection: React.FC<{ title: string; onEdit: () => void; children: React.ReactNode }> = ({ title, onEdit, children }) => (
  <Card className="mb-6">
    <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-bold text-gray-900">{title}</h3>
            <Button variant="secondary" onClick={onEdit} className="inline-flex items-center text-sm">
                <EditIcon className="w-4 h-4 mr-2"/>
                Edit
            </Button>
        </div>
        <dl className="space-y-3">{children}</dl>
    </div>
  </Card>
);

const ReviewItem: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
    value !== undefined && value !== null && value !== '' && String(value).trim() !== '$0' ? (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-sm text-gray-900 sm:col-span-2">{value}</dd>
      </div>
    ) : null
);

const OnboardingReview: React.FC<Props> = ({ employee, formData, onEdit, steps }) => {
  const getStepIndex = (formKey: keyof Employee['taxForms']) => {
    return steps.findIndex(step => step.formKey === formKey);
  }

  const renderStateFormReview = () => {
    const stateFormKey = steps.find(s => s.id === 'state')?.formKey;
    if (!stateFormKey || !formData[stateFormKey]) return null;

    const data = formData[stateFormKey];
    const stateName = steps.find(s => s.id === 'state')?.name || "State Form";
    const title = `${stateName} (Tax Year ${data.formYear})`;

    let content = null;

    switch (employee.stateOfResidence) {
      case 'AL': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Dependent Allowances" value={data.dependentAllowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'AZ': content = <><ReviewItem label="Withholding Rate" value={`${data.withholdingRate}%`} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'AR': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Total Allowances" value={data.totalAllowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'CA': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Total Allowances" value={data.totalAllowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'CO': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      // FIX: Display full description for withholding code.
      case 'CT': content = <><ReviewItem label="Withholding Code" value={CTFilingStatus[data.withholdingCode as keyof typeof CTFilingStatus]} /><ReviewItem label="Exempt" value={data.withholdingCode === 'E' ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'DC': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'DE': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'GA': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Dependent Allowances" value={data.dependentAllowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'HI': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'ID': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'IL': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'IN': content = <><ReviewItem label="Personal Exemptions" value={data.personalExemptions} /><ReviewItem label="Dependent Exemptions" value={data.dependentExemptions} /><ReviewItem label="Additional Exemptions" value={data.additionalExemptions} /><ReviewItem label="County of Residence" value={data.countyOfResidence} /><ReviewItem label="County of Work" value={data.countyOfPrincipalWork} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'IA': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'KS': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'KY': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Local Tax Jurisdiction" value={data.localTaxJurisdiction} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'LA': content = <><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Dependents" value={data.dependents} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'ME': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MD': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="County of Residence" value={data.countyOfResidence} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MA': content = <><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MI': content = <><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MN': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MS': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MO': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'MT': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'NE': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'NJ': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Withholding Rate" value={`Rate ${data.withholdingRate}`} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'NY': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Total Allowances" value={data.totalAllowances} /><ReviewItem label="NYC Resident" value={data.isNYCResident ? `Yes (Allowances: ${data.nycAllowances})` : 'No'} /><ReviewItem label="Yonkers Resident" value={data.isYonkersResident ? `Yes (Allowances: ${data.yonkersAllowances})` : 'No'} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt from Withholding" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'NC': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'ND': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'OH': content = <><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="School District Number" value={data.schoolDistrictNumber} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'OK': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'OR': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Military Spouse Exemption" value={data.isExemptForMilitarySpouse ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Nonwage Income" value={`$${data.nonwageIncome}`} /><ReviewItem label="Deductions" value={`$${data.deductions}`} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'PA': content = <><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /></>; break;
      case 'RI': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'SC': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'VA': content = <><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'VT': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'WV': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Exemptions" value={data.exemptions} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      case 'WI': content = <><ReviewItem label="Filing Status" value={data.filingStatus} /><ReviewItem label="Allowances" value={data.allowances} /><ReviewItem label="Additional Withholding" value={`$${data.additionalWithholding}`} /><ReviewItem label="Exempt" value={data.isExempt ? 'Yes' : 'No'} /><ReviewItem label="Exemption Reason" value={data.exemptionReason} /></>; break;
      
      // States with no tax / acknowledgement
      case 'AK': case 'FL': case 'NV': case 'NH': case 'SD': case 'TN': case 'TX': case 'WA': case 'WY': case 'NM': case 'UT': 
        content = <ReviewItem label="Acknowledged" value={data.hasAcknowledged ? 'Yes' : 'No'} />; break;
    }

    return <ReviewSection title={title} onEdit={() => onEdit(getStepIndex(stateFormKey))}>{content}</ReviewSection>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please review all the information you've provided. If everything is correct, proceed to submit. You can use the "Edit" button on any section to make changes.
        </p>
      </div>

      <div>
        {employee.employeeType === 'W2' && formData.i9Form && (
            <ReviewSection title={`I-9 Verification (${formData.i9Form.formVersion})`} onEdit={() => onEdit(getStepIndex('i9Form'))}>
                <ReviewItem label="Full Name" value={`${formData.i9Form.firstName} ${formData.i9Form.middleInitial} ${formData.i9Form.lastName}`} />
                <ReviewItem label="Date of Birth" value={formData.i9Form.dateOfBirth} />
                <ReviewItem label="Address" value={`${formData.i9Form.address}, ${formData.i9Form.city}, ${formData.i9Form.state} ${formData.i9Form.zipCode}`} />
                <ReviewItem label="County" value={formData.i9Form.county} />
                <ReviewItem label="Citizenship Status" value={formData.i9Form.citizenshipStatus} />
                {formData.i9Form.listADocument?.title && <ReviewItem label="List A Document" value={`${formData.i9Form.listADocument.title} (#${formData.i9Form.listADocument.documentNumber})`} />}
                {formData.i9Form.listBDocument?.title && <ReviewItem label="List B Document" value={`${formData.i9Form.listBDocument.title} (#${formData.i9Form.listBDocument.documentNumber})`} />}
                {formData.i9Form.listCDocument?.title && <ReviewItem label="List C Document" value={`${formData.i9Form.listCDocument.title} (#${formData.i9Form.listCDocument.documentNumber})`} />}
            </ReviewSection>
        )}

        {employee.employeeType === 'W2' && formData.federalW4 && (
            <ReviewSection title={`Federal W-4 (Tax Year ${formData.federalW4.formYear})`} onEdit={() => onEdit(getStepIndex('federalW4'))}>
                <ReviewItem label="Filing Status" value={formData.federalW4.filingStatus} />
                <ReviewItem label="Multiple Jobs" value={formData.federalW4.multipleJobs ? 'Yes' : 'No'} />
                <ReviewItem label="Qualifying Children" value={`$${formData.federalW4.qualifyingChildrenAmount}`} />
                <ReviewItem label="Other Dependents" value={`$${formData.federalW4.otherDependentsAmount}`} />
                <ReviewItem label="Other Income" value={`$${formData.federalW4.otherIncome}`} />
                <ReviewItem label="Deductions" value={`$${formData.federalW4.deductions}`} />
                <ReviewItem label="Extra Withholding" value={`$${formData.federalW4.extraWithholding}`} />
                <ReviewItem label="Exempt from Withholding" value={formData.federalW4.isExempt ? 'Yes' : 'No'} />
                <ReviewItem label="Exemption Reason" value={formData.federalW4.exemptionReason} />
            </ReviewSection>
        )}
        
        {employee.employeeType === '1099' && formData.federalW9 && (
            <ReviewSection title={`Federal W-9 (${formData.federalW9.formVersion})`} onEdit={() => onEdit(getStepIndex('federalW9'))}>
                <ReviewItem label="Full Name" value={formData.federalW9.name} />
                <ReviewItem label="Business Name" value={formData.federalW9.businessName} />
                <ReviewItem label="Tax Classification" value={formData.federalW9.taxClassification} />
                <ReviewItem label="Address" value={`${formData.federalW9.address}, ${formData.federalW9.city}, ${formData.federalW9.state} ${formData.federalW9.zip}`} />
                <ReviewItem label="County" value={formData.federalW9.county} />
                <ReviewItem label="SSN" value={formData.federalW9.ssn} />
                <ReviewItem label="EIN" value={formData.federalW9.ein} />
                <ReviewItem label="FEIN" value={formData.federalW9.fein} />
                <ReviewItem label="Requester" value={formData.federalW9.requesterNameAndAddress} />
            </ReviewSection>
        )}
        
        {renderStateFormReview()}

      </div>
    </div>
  );
};

export default OnboardingReview;
