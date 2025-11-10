import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEmployeeProfiles } from '../contexts/EmployeeProfileContext';
import * as D from '../App';
import { Employee, FormSubmission, ErrorObject } from '../types';
import Button from '../components/ui/Button';
import OnboardingStepper from '../components/OnboardingStepper';
import OnboardingReview from '../components/OnboardingReview';
import { OnboardingWelcomeIcon, OnboardingSuccessIcon } from '../components/icons/Icon';
import { useToast } from '../contexts/ToastContext';
import FederalW4Form from '../components/forms/FederalW4Form';
import FederalW9Form from '../components/forms/FederalW9Form';
import I9Form from '../components/forms/I9Form';
import NYIT2104Form from '../components/forms/NYIT2104Form';
import NJW4Form from '../components/forms/NJW4Form';
import CADE4Form from '../components/forms/CADE4Form';
import INWH4Form from '../components/forms/INWH4Form';
import ORW4Form from '../components/forms/ORW4Form';
import ILW4Form from '../components/forms/ILW4Form';
import NoStateTaxForm from '../components/forms/NoStateTaxForm';
import ALA4Form from '../components/forms/ALA4Form';
import AZA4Form from '../components/forms/AZA4Form';
import ARAR4ECForm from '../components/forms/ARAR4ECForm';
import CODR0004Form from '../components/forms/CODR0004Form';
import CTW4Form from '../components/forms/CTW4Form';
import DCW4Form from '../components/forms/DCW4Form';
import DEW4Form from '../components/forms/DEW4Form';
import GAW4Form from '../components/forms/GAW4Form';
import HIHW4Form from '../components/forms/HIHW4Form';
import IAW4Form from '../components/forms/IAW4Form';
import IDW4Form from '../components/forms/IDW4Form';
import KSK4Form from '../components/forms/KSK4Form';
import KYK4Form from '../components/forms/KYK4Form';
import LAL4Form from '../components/forms/LAL4Form';
import MAM4Form from '../components/forms/MAM4Form';
import MDMW507Form from '../components/forms/MDMW507Form';
import MEW4Form from '../components/forms/MEW4Form';
import MIW4Form from '../components/forms/MIW4Form';
import MNW4MNForm from '../components/forms/MNW4MNForm';
import MOW4Form from '../components/forms/MOW4Form';
import MS89350Form from '../components/forms/MS89350Form';
import MTMW4Form from '../components/forms/MTMW4Form';
import NCW4Form from '../components/forms/NCW4Form';
// FIX: Changed to named import for NDW4Form
import { NDW4Form } from '../components/forms/NDW4Form';
import NEW4NForm from '../components/forms/NEW4NForm';
import OHIT4Form from '../components/forms/OHIT4Form';
import OKW4Form from '../components/forms/OKW4Form';
import PAW4Form from '../components/forms/PAW4Form';
import RIW4Form from '../components/forms/RIW4Form';
import SCW4Form from '../components/forms/SCW4Form';
import VAW4Form from '../components/forms/VAW4Form';
import VTW4Form from '../components/forms/VTW4Form';
import WIWT4Form from '../components/forms/WIWT4Form';
import WVIT104Form from '../components/forms/WVIT104Form';
import * as V from '../utils/validation';


type Step = { id: string; name: string; subText: string; formKey: keyof Employee['taxForms'] | null; };
type OnboardingDataType = { [key: string]: any };

const AUTOSAVE_INTERVAL = 30000;

const Onboarding: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { erpEmployeeName } = location.state || {}; 
  const { employees, updateEmployee } = useEmployeeProfiles();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingDataType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const { addToast } = useToast();
  const onboardingDataRef = useRef<OnboardingDataType | null>(null);
  const currentStepRef = useRef(currentStep);

  const isUpdateFlow = new URLSearchParams(location.search).get('flow') === 'update';

  useEffect(() => { onboardingDataRef.current = onboardingData; }, [onboardingData]);
  useEffect(() => { currentStepRef.current = currentStep; }, [currentStep]);

  const steps = useMemo<Step[]>(() => {
    if (!employee) return [];
    
    let baseSteps: Step[] = [{ id: 'welcome', name: 'Welcome', subText: "Let's get started", formKey: null }];
    
    if (employee.employeeType === 'W2') {
        baseSteps.push({ id: 'i9', name: 'I-9 Verification', subText: 'Employment Eligibility', formKey: 'i9Form' });
        baseSteps.push({ id: 'w4', name: 'Federal W-4', subText: 'Tax Withholding', formKey: 'federalW4' });
        
        let stateForm: Step | null = null;
        const state = employee.stateOfResidence;
        const stateName = V.usStates.find(s => s.abbreviation === state)?.name || state;

        switch (state) {
            case 'AL': stateForm = { id: 'state', name: 'AL Form A-4', subText: 'State Tax Form', formKey: 'al_A4' }; break;
            case 'AK': case 'FL': case 'NV': case 'NH': case 'SD': case 'TN': case 'TX': case 'WA': case 'WY': case 'NM': case 'UT': 
                // FIX: Explicitly type keyMap to ensure correct type inference for formKey.
                const keyMap: Record<string, keyof Employee['taxForms']> = { AK: 'ak_Acknowledgement', FL: 'fl_Acknowledgement', NV: 'nv_Acknowledgement', NH: 'nh_Acknowledgement', SD: 'sd_Acknowledgement', TN: 'tn_Acknowledgement', TX: 'tx_Acknowledgement', WA: 'wa_Acknowledgement', WY: 'wy_Acknowledgement', NM: 'nm_Acknowledgement', UT: 'ut_Acknowledgement' };
                stateForm = { id: 'state', name: `${stateName} Form`, subText: 'State Acknowledgement', formKey: keyMap[state as keyof typeof keyMap] }; 
                break;
            case 'AZ': stateForm = { id: 'state', name: 'AZ Form A-4', subText: 'State Tax Form', formKey: 'az_A4' }; break;
            case 'AR': stateForm = { id: 'state', name: 'AR Form AR4EC', subText: 'State Tax Form', formKey: 'ar_AR4EC' }; break;
            case 'CA': stateForm = { id: 'state', name: 'CA Form DE 4', subText: 'State Tax Form', formKey: 'ca_DE4' }; break;
            case 'CO': stateForm = { id: 'state', name: 'CO Form DR 0004', subText: 'State Tax Form', formKey: 'co_DR0004' }; break;
            case 'CT': stateForm = { id: 'state', name: 'CT Form CT-W4', subText: 'State Tax Form', formKey: 'ct_W4' }; break;
            case 'DC': stateForm = { id: 'state', name: 'DC Form D-4', subText: 'State Tax Form', formKey: 'dc_W4' }; break;
            case 'DE': stateForm = { id: 'state', name: 'DE Form W-4', subText: 'State Tax Form', formKey: 'de_W4' }; break;
            case 'GA': stateForm = { id: 'state', name: 'GA Form G-4', subText: 'State Tax Form', formKey: 'ga_G4' }; break;
            case 'HI': stateForm = { id: 'state', name: 'HI Form HW-4', subText: 'State Tax Form', formKey: 'hi_HW4' }; break;
            case 'ID': stateForm = { id: 'state', name: 'ID Form W-4', subText: 'State Tax Form', formKey: 'id_W4' }; break;
            case 'IL': stateForm = { id: 'state', name: 'IL Form IL-W-4', subText: 'State Tax Form', formKey: 'il_W4' }; break;
            case 'IN': stateForm = { id: 'state', name: 'IN Form WH-4', subText: 'State Tax Form', formKey: 'in_WH4' }; break;
            case 'IA': stateForm = { id: 'state', name: 'IA Form IA W-4', subText: 'State Tax Form', formKey: 'ia_W4' }; break;
            case 'KS': stateForm = { id: 'state', name: 'KS Form K-4', subText: 'State Tax Form', formKey: 'ks_K4' }; break;
            case 'KY': stateForm = { id: 'state', name: 'KY Form K-4', subText: 'State Tax Form', formKey: 'ky_K4' }; break;
            case 'LA': stateForm = { id: 'state', name: 'LA Form L-4', subText: 'State Tax Form', formKey: 'la_L4' }; break;
            case 'ME': stateForm = { id: 'state', name: 'ME Form W-4ME', subText: 'State Tax Form', formKey: 'me_W4' }; break;
            case 'MD': stateForm = { id: 'state', name: 'MD Form MW507', subText: 'State Tax Form', formKey: 'md_MW507' }; break;
            case 'MA': stateForm = { id: 'state', name: 'MA Form M-4', subText: 'State Tax Form', formKey: 'ma_M4' }; break;
            case 'MI': stateForm = { id: 'state', name: 'MI Form MI-W4', subText: 'State Tax Form', formKey: 'mi_W4' }; break;
            case 'MN': stateForm = { id: 'state', name: 'MN Form W-4MN', subText: 'State Tax Form', formKey: 'mn_W4MN' }; break;
            case 'MS': stateForm = { id: 'state', name: 'MS Form 89-350', subText: 'State Tax Form', formKey: 'ms_89350' }; break;
            case 'MO': stateForm = { id: 'state', name: 'MO Form MO W-4', subText: 'State Tax Form', formKey: 'mo_W4' }; break;
            case 'MT': stateForm = { id: 'state', name: 'MT Form MW-4', subText: 'State Tax Form', formKey: 'mt_MW4' }; break;
            case 'NE': stateForm = { id: 'state', name: 'NE Form W-4N', subText: 'State Tax Form', formKey: 'ne_W4N' }; break;
            case 'NJ': stateForm = { id: 'state', name: 'NJ Form W-4', subText: 'State Tax Form', formKey: 'nj_W4' }; break;
            case 'NY': stateForm = { id: 'state', name: 'NY Form IT-2104', subText: 'State Tax Form', formKey: 'ny_IT2104' }; break;
            case 'NC': stateForm = { id: 'state', name: 'NC Form NC-4', subText: 'State Tax Form', formKey: 'nc_W4' }; break;
            case 'ND': stateForm = { id: 'state', name: 'ND Form NDW-R', subText: 'State Tax Form', formKey: 'nd_W4' }; break;
            case 'OH': stateForm = { id: 'state', name: 'OH Form IT 4', subText: 'State Tax Form', formKey: 'oh_IT4' }; break;
            case 'OK': stateForm = { id: 'state', name: 'OK Form OK-W-4', subText: 'State Tax Form', formKey: 'ok_W4' }; break;
            case 'OR': stateForm = { id: 'state', name: 'OR Form OR-W-4', subText: 'State Tax Form', formKey: 'or_W4' }; break;
            case 'PA': stateForm = { id: 'state', name: 'PA Form REV-419', subText: 'State Tax Form', formKey: 'pa_W4' }; break;
            case 'RI': stateForm = { id: 'state', name: 'RI Form RI W-4', subText: 'State Tax Form', formKey: 'ri_W4' }; break;
            case 'SC': stateForm = { id: 'state', name: 'SC Form SC W-4', subText: 'State Tax Form', formKey: 'sc_W4' }; break;
            case 'VA': stateForm = { id: 'state', name: 'VA Form VA-4', subText: 'State Tax Form', formKey: 'va_W4' }; break;
            case 'VT': stateForm = { id: 'state', name: 'VT Form W-4VT', subText: 'State Tax Form', formKey: 'vt_W4' }; break;
            case 'WV': stateForm = { id: 'state', name: 'WV Form WV/IT-104', subText: 'State Tax Form', formKey: 'wv_IT104' }; break;
            case 'WI': stateForm = { id: 'state', name: 'WI Form WT-4', subText: 'State Tax Form', formKey: 'wi_WT4' }; break;
        }
        if (stateForm) baseSteps.push(stateForm);
    } else {
        baseSteps.push({ id: 'w9', name: 'Federal W-9', subText: 'Taxpayer Information', formKey: 'federalW9' });
    }

    baseSteps.push({ id: 'review', name: 'Review & Submit', subText: 'Final Confirmation', formKey: null });
    baseSteps.push({ id: 'complete', name: 'Onboarding Complete', subText: 'All set!', formKey: null });
    
    if (isUpdateFlow) {
        const incompleteForms = V.getIncompleteForms(employee);
        const updateSteps = baseSteps.filter(step => {
            return !step.formKey || incompleteForms.includes(step.formKey);
        });
        if (updateSteps[0]?.id === 'welcome') {
            updateSteps[0] = { ...updateSteps[0], name: 'Update Forms', subText: 'Complete new required forms' };
        }
        return updateSteps;
    }

    return baseSteps;
  }, [employee, isUpdateFlow]);

  useEffect(() => {
    const foundEmployee = employees.find(e => e.id === parseInt(id || ''));
    if (!foundEmployee) return;
    setEmployee(foundEmployee);
    
    // const storageKey = `onboarding-progress-${foundEmployee.id}`;
    // const savedDataJSON = localStorage.getItem(storageKey);
    // if (savedDataJSON && window.confirm("We found unsaved progress. Restore it?")) {
    //     try {
    //         setOnboardingData(JSON.parse(savedDataJSON));
    //         addToast('Progress restored!', 'success');
    //         return;
    //     } catch (e) {
    //         console.error("Failed to parse saved data.", e);
    //         localStorage.removeItem(storageKey);
    //     }
    // }

    const initialForms: OnboardingDataType = {};
    const [firstName, ...lastNameParts] = foundEmployee.name.trim().split(' ');
    const lastName = lastNameParts.join(' ');

    if (foundEmployee.employeeType === 'W2') {
        initialForms.i9Form = foundEmployee.taxForms.i9Form?.[0]?.formData || { ...D.defaultI9, firstName, lastName };
        initialForms.federalW4 = foundEmployee.taxForms.federalW4?.[0]?.formData || D.defaultW4;
        
        const stateKey = steps.find(s => s.id === 'state')?.formKey;
        if (stateKey) {
            const defaultKey = `default${foundEmployee.stateOfResidence}`;
            initialForms[stateKey] = foundEmployee.taxForms[stateKey as keyof Employee['taxForms']]?.[0]?.formData || (D as any)[defaultKey] || D.defaultAcknowledgement;
        }
    } else {
        initialForms.federalW9 = foundEmployee.taxForms.federalW9?.[0]?.formData || { ...D.defaultW9, name: foundEmployee.name, firstName, lastName };
    }
    setOnboardingData(initialForms);
}, [id, employees, addToast, steps]);


  // Autosave progress
  useEffect(() => {
    if (!employee) return;
    const intervalId = setInterval(() => {
      const currentData = onboardingDataRef.current;
      const currentStepId = steps[currentStepRef.current]?.id;
      if (currentData && employee && currentStepId && !['welcome', 'complete'].includes(currentStepId)) {
        localStorage.setItem(`onboarding-progress-${employee.id}`, JSON.stringify(currentData));
      }
    }, AUTOSAVE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [employee, steps]);


  const handleFormChange = (formName: string, data: any) => {
    setOnboardingData(prev => prev ? { ...prev, [formName]: data } : null);
  };

  const handleNext = async () => {
    const step = steps[currentStep];
    const formKey = step.formKey;
    let validationErrors: any = {};
    
    if (formKey && onboardingData && onboardingData[formKey]) {
        const formData = onboardingData[formKey];
        const validationMap: { [key in keyof Employee['taxForms']]?: (data: any) => ErrorObject } = {
            i9Form: V.validateI9Form,
            federalW4: V.validateFederalW4,
            federalW9: V.validateFederalW9,
            ny_IT2104: V.validateNYIT2104,
            nj_W4: V.validateNJW4,
            ca_DE4: V.validateCADE4,
            in_WH4: V.validateINWH4,
            or_W4: V.validateORW4,
            il_W4: V.validateILW4,
            al_A4: V.validateALA4,
            az_A4: V.validateAZA4,
            ar_AR4EC: V.validateARAR4EC,
            co_DR0004: V.validateCODR0004,
            ct_W4: V.validateCTW4,
            dc_W4: V.validateDCW4,
            de_W4: V.validateDEW4,
            ga_G4: V.validateGAG4,
            hi_HW4: V.validateHIHW4,
            ia_W4: V.validateIAW4,
            id_W4: V.validateIDW4,
            ks_K4: V.validateKSK4,
            ky_K4: V.validateKYK4,
            la_L4: V.validateLAL4,
            me_W4: V.validateMEW4,
            md_MW507: V.validateMDMW507,
            ma_M4: V.validateMAM4,
            mi_W4: V.validateMIW4,
            mn_W4MN: V.validateMNW4MN,
            ms_89350: V.validateMS89350,
            mo_W4: V.validateMOW4,
            mt_MW4: V.validateMTMW4,
            ne_W4N: V.validateNEW4N,
            nc_W4: V.validateNCW4,
            nd_W4: V.validateNDW4,
            oh_IT4: V.validateOHIT4,
            ok_W4: V.validateOKW4,
            pa_W4: V.validatePAW4,
            ri_W4: V.validateRIW4,
            sc_W4: V.validateSCW4,
            vt_W4: V.validateVTW4,
            va_W4: V.validateVAW4,
            wv_IT104: V.validateWVIT104,
            wi_WT4: V.validateWIWT4,
            ak_Acknowledgement: V.validateAcknowledgement,
            fl_Acknowledgement: V.validateAcknowledgement,
            nv_Acknowledgement: V.validateAcknowledgement,
            nh_Acknowledgement: V.validateAcknowledgement,
            sd_Acknowledgement: V.validateAcknowledgement,
            tn_Acknowledgement: V.validateAcknowledgement,
            tx_Acknowledgement: V.validateAcknowledgement,
            wa_Acknowledgement: V.validateAcknowledgement,
            wy_Acknowledgement: V.validateAcknowledgement,
            nm_Acknowledgement: V.validateAcknowledgement,
            ut_Acknowledgement: V.validateAcknowledgement,
        };
        const validationFunction = validationMap[formKey];
        if (validationFunction) {
            validationErrors = validationFunction(formData);
        }
    }
    
   if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors);
  return;
}

setErrors({});

if (steps[currentStep].id === "i9" && onboardingData?.i9Form) {
    try {
      const payload = onboardingData.i9Form;
      const res = await fetch("/api/method/us_payroll_onboarding.api.i9_form.create_basic_i9_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        body: JSON.stringify({
          employee: erpEmployeeName,
          form_data: payload,
          custom_employee_id: String(employee.id),
        }),
      });

      const result = await res.json();
      if (result.exc) throw new Error(result.exc);

      console.log("✅ I9 Form created successfully:", result);
      addToast("I-9 Form created in ERPNext!", "success");
    } catch (error) {
      console.error("❌ Failed to create I9 Form in ERPNext:", error);
      addToast("Failed to sync I-9 Form with ERPNext.", "error");
    }
  }

  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  }
};

  const handleBack = () => {
    if (currentStep > 0) {
      setErrors({});
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleStepClick = (stepIndex: number) => {
    if (steps[currentStep].id === 'review' && stepIndex < currentStep) {
        setCurrentStep(stepIndex);
    }
  }

  const handleSubmit = async () => {
    if (!employee || !onboardingData) return;
    setIsSaving(true);
    setSaveError(null);
    
    const submissionDate = new Date().toISOString().split('T')[0];
    const updatedTaxForms: Employee['taxForms'] = { ...employee.taxForms };

    Object.keys(onboardingData).forEach(key => {
        const formKey = key as keyof Employee['taxForms'];
        const formStep = steps.find(s => s.formKey === formKey);
        if (formStep) {
            const newSubmission: FormSubmission<any> = { formData: onboardingData[formKey], submissionDate };
            const existingHistory = (updatedTaxForms[formKey] as FormSubmission<any>[]) || [];
            (updatedTaxForms[formKey] as any) = [newSubmission, ...existingHistory];
        }
    });

    try {
      await updateEmployee(employee.id, { taxForms: updatedTaxForms });
      addToast(isUpdateFlow ? 'Forms updated successfully!' : 'Onboarding forms submitted!', 'success');
      localStorage.removeItem(`onboarding-progress-${employee.id}`);
      handleNext();
    } catch (error) {
       setSaveError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const WelcomeScreen = () => (
    <div className="text-center p-8 flex flex-col items-center">
        <OnboardingWelcomeIcon className="w-48 h-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isUpdateFlow ? 'Update Required Forms' : `Welcome aboard, ${employee?.name}!`}
        </h2>
        <p className="text-gray-600 max-w-md">
            {isUpdateFlow 
                ? `Due to changes in your profile, a few new forms are required. Let's get them filled out.`
                : `This process will help you complete your employment forms quickly.`
            }
        </p>
        <p className="text-gray-600 mt-2">Click "Next" to begin.</p>
    </div>
  );

  const SuccessScreen = () => (
    <div className="text-center p-8 flex flex-col items-center">
        <OnboardingSuccessIcon className="w-32 h-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
        <p className="text-gray-600 max-w-md">Thank you for completing your paperwork. No further action is needed.</p>
        <Button onClick={() => navigate('/dashboard')} className="mt-8">Return to Dashboard</Button>
    </div>
  );

  if (!employee || !onboardingData) {
    return <div>Loading employee data...</div>;
  }

  const renderStepContent = () => {
    const step = steps[currentStep];
    const state = employee.stateOfResidence;
    const formKey = step.formKey;
    const formData = formKey ? onboardingData[formKey] : null;

    if (!formData && step.id !== 'welcome' && step.id !== 'review' && step.id !== 'complete') {
        return <div>Loading form...</div>;
    }

    switch (step.id) {
      case 'welcome': return <WelcomeScreen />;
      case 'i9':
  return (
    <I9Form
      data={formData}
      onChange={d => handleFormChange('i9Form', d)}
      errors={errors}
      employeeId={String(employee.id)}
      erpEmployeeName={erpEmployeeName}
    />
  );

      case 'w4': return <FederalW4Form data={formData} onChange={d => handleFormChange('federalW4', d)} errors={errors} />;
      case 'w9': return <FederalW9Form data={formData} onChange={d => handleFormChange('federalW9', d)} errors={errors} />;
      case 'state':
        if (!formKey) return null;
        const FormComponent = getFormComponent(state);
        if (!FormComponent) return <div>State form not found for {state}.</div>;

        let extraProps: any = {};
        if (['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'].includes(state)) {
            extraProps.stateName = V.usStates.find(s => s.abbreviation === state)?.name || state;
        } else if (['NM', 'UT'].includes(state)) {
            extraProps.stateName = V.usStates.find(s => s.abbreviation === state)?.name || state;
            extraProps.usesFederalW4 = true;
        }
        
        return <FormComponent data={formData} onChange={(d: any) => handleFormChange(formKey, d)} errors={errors} {...extraProps} />;
      case 'review': return <OnboardingReview employee={employee} formData={onboardingData} onEdit={handleStepClick} steps={steps}/>;
      case 'complete': return <SuccessScreen />;
      default: return <div>Unknown step.</div>;
    }
  };
  
  const getFormComponent = (state: string): React.FC<any> | null => {
    switch (state) {
        case 'AL': return ALA4Form;
        case 'AK': case 'FL': case 'NV': case 'NH': case 'SD': case 'TN': case 'TX': case 'WA': case 'WY': case 'NM': case 'UT': return NoStateTaxForm;
        case 'AZ': return AZA4Form;
        case 'AR': return ARAR4ECForm;
        case 'CA': return CADE4Form;
        case 'CO': return CODR0004Form;
        case 'CT': return CTW4Form;
        case 'DC': return DCW4Form;
        case 'DE': return DEW4Form;
        case 'GA': return GAW4Form;
        case 'HI': return HIHW4Form;
        case 'ID': return IDW4Form;
        case 'IL': return ILW4Form;
        case 'IN': return INWH4Form;
        case 'IA': return IAW4Form;
        case 'KS': return KSK4Form;
        case 'KY': return KYK4Form;
        case 'LA': return LAL4Form;
        case 'ME': return MEW4Form;
        case 'MD': return MDMW507Form;
        case 'MA': return MAM4Form;
        case 'MI': return MIW4Form;
        case 'MN': return MNW4MNForm;
        case 'MS': return MS89350Form;
        case 'MO': return MOW4Form;
        case 'MT': return MTMW4Form;
        case 'NE': return NEW4NForm;
        case 'NJ': return NJW4Form;
        case 'NY': return NYIT2104Form;
        case 'NC': return NCW4Form;
        case 'ND': return NDW4Form;
        case 'OH': return OHIT4Form;
        case 'OK': return OKW4Form;
        case 'OR': return ORW4Form;
        case 'PA': return PAW4Form;
        case 'RI': return RIW4Form;
        case 'SC': return SCW4Form;
        case 'VA': return VAW4Form;
        case 'VT': return VTW4Form;
        case 'WV': return WVIT104Form;
        case 'WI': return WIWT4Form;
        default: return null;
    }
  }


  const isFinalStep = steps[currentStep].id === 'complete';

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-72 lg:sticky lg:top-8 flex-shrink-0">
        <OnboardingStepper steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
      </div>
      
      <div className="flex-1 w-full">
         {saveError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Submission Failed: </strong>
              <span className="block sm:inline">{saveError}</span>
            </div>
          )}

        <div className="bg-white rounded-lg shadow-sm border border-frappe-gray-200">
            <div className="p-6 lg:p-8 min-h-[400px] flex flex-col justify-center">
                {renderStepContent()}
            </div>
            {!isFinalStep && (
                <div className="bg-frappe-gray-50 px-6 py-4 border-t border-frappe-gray-200 flex justify-between items-center">
                    <Button variant="secondary" onClick={handleBack} disabled={currentStep === 0 || isSaving}>
                      Back
                    </Button>
                    {steps[currentStep].id === 'review' ? (
                       <Button onClick={handleSubmit} disabled={isSaving}>
                         {isSaving ? 'Submitting...' : 'Submit Forms'}
                       </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                      </Button>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;