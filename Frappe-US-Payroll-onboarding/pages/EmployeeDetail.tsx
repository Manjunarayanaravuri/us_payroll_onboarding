import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEmployeeProfiles } from '../contexts/EmployeeProfileContext';
import { Employee, FormSubmission, ErrorObject } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FederalW4Form from '../components/forms/FederalW4Form';
import FederalW9Form from '../components/forms/FederalW9Form';
import I9Form from '../components/forms/I9Form';
import SubmissionHistory from '../components/SubmissionHistory';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, InfoIcon, EditIcon, RefreshCwIcon } from '../components/icons/Icon';
import { useToast } from '../contexts/ToastContext';
import EditEmployeeModal from '../components/EditEmployeeModal';

// Import all state form components and validation functions
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
import { getRequiredForms, getIncompleteForms } from '../utils/validation';

const addSubmissionToEmployee = (employee: Employee, formName: keyof Employee['taxForms'], formData: any): Employee => {
    const submissionDate = new Date().toISOString().split('T')[0];
    const newSubmission: FormSubmission<any> = { formData, submissionDate };
    const existingSubmissions = (employee.taxForms[formName] as FormSubmission<any>[]) || [];
    const newHistory = [newSubmission, ...existingSubmissions];
    return {
      ...employee,
      taxForms: { ...employee.taxForms, [formName]: newHistory },
    };
}

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { employees, updateEmployee } = useEmployeeProfiles();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [activeTabKey, setActiveTabKey] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});
  const { addToast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [incompleteForms, setIncompleteForms] = useState<string[]>([]);


  useEffect(() => {
    const foundEmployee = employees.find(e => e.id === parseInt(id || ''));
    if (foundEmployee) {
        setEmployee(foundEmployee);
        setIncompleteForms(getIncompleteForms(foundEmployee));
    } else {
        setEmployee(null);
        setIncompleteForms([]);
    }
  }, [id, employees]);

  const formTabs = useMemo(() => {
    if (!employee) return [];
    
    const tabs: Array<{ key: keyof Employee['taxForms']; label: string; isComplete: boolean }> = [];
    const requiredForms = getRequiredForms(employee);

    requiredForms.forEach(formKey => {
      const submissions = employee.taxForms[formKey] || [];
      const isComplete = submissions.length > 0;
      const year = (submissions[0]?.formData as any)?.formYear || new Date().getFullYear();
      const version = (submissions[0]?.formData as any)?.formVersion || 'N/A';
      
      let label = '';
      switch (formKey) {
        case 'i9Form': label = `I-9 Verification (${version})`; break;
        case 'federalW4': label = `Federal W-4 (${year})`; break;
        case 'federalW9': label = `Federal W-9 (${version})`; break;
        case 'al_A4': label = `AL A-4 (${year})`; break;
        case 'ak_Acknowledgement': case 'fl_Acknowledgement': case 'nv_Acknowledgement': case 'nh_Acknowledgement': case 'sd_Acknowledgement': case 'tn_Acknowledgement': case 'tx_Acknowledgement': case 'wa_Acknowledgement': case 'wy_Acknowledgement': label = `${employee.stateOfResidence} Acknowledgement (${year})`; break;
        case 'nm_Acknowledgement': case 'ut_Acknowledgement': label = `${employee.stateOfResidence} Acknowledgement (${year})`; break;
        case 'az_A4': label = `AZ A-4 (${year})`; break;
        case 'ar_AR4EC': label = `AR AR4EC (${year})`; break;
        case 'ca_DE4': label = `CA DE 4 (${year})`; break;
        case 'co_DR0004': label = `CO DR 0004 (${year})`; break;
        case 'ct_W4': label = `CT W-4 (${year})`; break;
        case 'de_W4': label = `DE W-4 (${year})`; break;
        case 'dc_W4': label = `DC D-4 (${year})`; break;
        case 'ga_G4': label = `GA G-4 (${year})`; break;
        case 'hi_HW4': label = `HI HW-4 (${year})`; break;
        case 'id_W4': label = `ID W-4 (${year})`; break;
        case 'il_W4': label = `IL W-4 (${year})`; break;
        case 'in_WH4': label = `IN WH-4 (${year})`; break;
        case 'ia_W4': label = `IA W-4 (${year})`; break;
        case 'ks_K4': label = `KS K-4 (${year})`; break;
        case 'ky_K4': label = `KY K-4 (${year})`; break;
        case 'la_L4': label = `LA L-4 (${year})`; break;
        case 'me_W4': label = `ME W-4 (${year})`; break;
        case 'md_MW507': label = `MD MW507 (${year})`; break;
        case 'ma_M4': label = `MA M-4 (${year})`; break;
        case 'mi_W4': label = `MI W-4 (${year})`; break;
        case 'mn_W4MN': label = `MN W-4MN (${year})`; break;
        case 'ms_89350': label = `MS 89-350 (${year})`; break;
        case 'mo_W4': label = `MO W-4 (${year})`; break;
        case 'mt_MW4': label = `MT MW-4 (${year})`; break;
        case 'ne_W4N': label = `NE W-4N (${year})`; break;
        case 'nj_W4': label = `NJ W-4 (${year})`; break;
        case 'ny_IT2104': label = `NY IT-2104 (${year})`; break;
        case 'nc_W4': label = `NC NC-4 (${year})`; break;
        case 'nd_W4': label = `ND NDW-R (${year})`; break;
        case 'oh_IT4': label = `OH IT 4 (${year})`; break;
        case 'ok_W4': label = `OK OK-W-4 (${year})`; break;
        case 'or_W4': label = `OR W-4 (${year})`; break;
        case 'pa_W4': label = `PA REV-419 (${year})`; break;
        case 'ri_W4': label = `RI W-4 (${year})`; break;
        case 'sc_W4': label = `SC W-4 (${year})`; break;
        case 'vt_W4': label = `VT W-4VT (${year})`; break;
        case 'va_W4': label = `VA VA-4 (${year})`; break;
        case 'wv_IT104': label = `WV IT-104 (${year})`; break;
        case 'wi_WT4': label = `WI WT-4 (${year})`; break;
      }
      tabs.push({ key: formKey, label, isComplete });
    });
    return tabs;
  }, [employee]);

  useEffect(() => {
    if (formTabs.length > 0) {
      const firstPendingTab = formTabs.find(tab => !tab.isComplete);
      if (firstPendingTab) {
        setActiveTabKey(firstPendingTab.key);
      } else if (!activeTabKey || !formTabs.find(t => t.key === activeTabKey)) {
        setActiveTabKey(formTabs[0].key);
      }
    }
  }, [formTabs, employee]);

  const handleSave = async (formName: keyof Employee['taxForms'], formData: any) => {
    if (!employee) return;
    
    let validationErrors: any = {};
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

    const validationFunction = validationMap[formName as keyof Employee['taxForms']];
    if (validationFunction) {
        validationErrors = validationFunction(formData);
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});
    setIsSaving(true);
    setSaveError(null);

    const formDataToSave = { ...formData, formYear: new Date().getFullYear() };
    const updatedEmployee = addSubmissionToEmployee(employee, formName, formDataToSave);
    
    try {
      await updateEmployee(employee.id, updatedEmployee);
      addToast(`${formTabs.find(tab => tab.key === formName)?.label.split(' (')[0]} successfully saved.`, 'success');
    } catch (error) {
       setSaveError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProfile = async (updatedData: Partial<Employee>) => {
    if (!employee) return;
    const stateOrTypeChanged = updatedData.stateOfResidence !== employee.stateOfResidence || updatedData.employeeType !== employee.employeeType;
    try {
        await updateEmployee(employee.id, updatedData);
        addToast("Profile updated successfully!", "success");
        if (stateOrTypeChanged) {
            addToast("Required forms have been updated due to profile changes.", "success");
        }
        setIsEditModalOpen(false);
    } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Failed to update profile.');
    }
  };


  if (!employee) { return <div>Loading...</div>; }
  
  const activeSubmissions = (employee.taxForms[activeTabKey as keyof Employee['taxForms']] || []) as FormSubmission<any>[];
  const latestFormData = activeSubmissions[0]?.formData;

  const getFormStatusIcon = (isComplete: boolean | undefined) => (
    isComplete ? <CheckCircleIcon className="w-5 h-5 text-green-500 ml-2" /> : <XCircleIcon className="w-5 h-5 text-yellow-500 ml-2" />
  );
  
  const tabClasses = "px-4 py-2 text-sm font-medium border-b-2 transition-colors";
  const activeTabClasses = "border-frappe-blue-500 text-frappe-blue-600";
  const inactiveTabClasses = "border-transparent text-frappe-gray-500 hover:text-frappe-gray-700 hover:border-frappe-gray-300";
  const typeBadgeClasses = employee.employeeType === 'W2' ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800";
  
  const hasIncompleteForms = incompleteForms.length > 0;
  const wasEverOnboarded = formTabs.some(tab => tab.isComplete);

  const renderActiveForm = () => {
    if (!latestFormData) return null;
    switch (activeTabKey) {
        case 'i9Form': return <I9Form data={latestFormData} onSave={d => handleSave('i9Form', d)} isSaving={isSaving} errors={errors} />;
        case 'federalW4': return <FederalW4Form data={latestFormData} onSave={d => handleSave('federalW4', d)} isSaving={isSaving} errors={errors} />;
        case 'federalW9': return <FederalW9Form data={latestFormData} onSave={d => handleSave('federalW9', d)} isSaving={isSaving} errors={errors} />;
        case 'ny_IT2104': return <NYIT2104Form data={latestFormData} onSave={d => handleSave('ny_IT2104', d)} isSaving={isSaving} errors={errors} />;
        case 'nj_W4': return <NJW4Form data={latestFormData} onSave={d => handleSave('nj_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ca_DE4': return <CADE4Form data={latestFormData} onSave={d => handleSave('ca_DE4', d)} isSaving={isSaving} errors={errors} />;
        case 'in_WH4': return <INWH4Form data={latestFormData} onSave={d => handleSave('in_WH4', d)} isSaving={isSaving} errors={errors} />;
        case 'or_W4': return <ORW4Form data={latestFormData} onSave={d => handleSave('or_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'il_W4': return <ILW4Form data={latestFormData} onSave={d => handleSave('il_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'al_A4': return <ALA4Form data={latestFormData} onSave={d => handleSave('al_A4', d)} isSaving={isSaving} errors={errors} />;
        case 'az_A4': return <AZA4Form data={latestFormData} onSave={d => handleSave('az_A4', d)} isSaving={isSaving} errors={errors} />;
        case 'ar_AR4EC': return <ARAR4ECForm data={latestFormData} onSave={d => handleSave('ar_AR4EC', d)} isSaving={isSaving} errors={errors} />;
        case 'co_DR0004': return <CODR0004Form data={latestFormData} onSave={d => handleSave('co_DR0004', d)} isSaving={isSaving} errors={errors} />;
        case 'ct_W4': return <CTW4Form data={latestFormData} onSave={d => handleSave('ct_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'dc_W4': return <DCW4Form data={latestFormData} onSave={d => handleSave('dc_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'de_W4': return <DEW4Form data={latestFormData} onSave={d => handleSave('de_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ga_G4': return <GAW4Form data={latestFormData} onSave={d => handleSave('ga_G4', d)} isSaving={isSaving} errors={errors} />;
        case 'hi_HW4': return <HIHW4Form data={latestFormData} onSave={d => handleSave('hi_HW4', d)} isSaving={isSaving} errors={errors} />;
        case 'ia_W4': return <IAW4Form data={latestFormData} onSave={d => handleSave('ia_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'id_W4': return <IDW4Form data={latestFormData} onSave={d => handleSave('id_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ks_K4': return <KSK4Form data={latestFormData} onSave={d => handleSave('ks_K4', d)} isSaving={isSaving} errors={errors} />;
        case 'ky_K4': return <KYK4Form data={latestFormData} onSave={d => handleSave('ky_K4', d)} isSaving={isSaving} errors={errors} />;
        case 'la_L4': return <LAL4Form data={latestFormData} onSave={d => handleSave('la_L4', d)} isSaving={isSaving} errors={errors} />;
        case 'ma_M4': return <MAM4Form data={latestFormData} onSave={d => handleSave('ma_M4', d)} isSaving={isSaving} errors={errors} />;
        case 'md_MW507': return <MDMW507Form data={latestFormData} onSave={d => handleSave('md_MW507', d)} isSaving={isSaving} errors={errors} />;
        case 'me_W4': return <MEW4Form data={latestFormData} onSave={d => handleSave('me_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'mi_W4': return <MIW4Form data={latestFormData} onSave={d => handleSave('mi_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'mn_W4MN': return <MNW4MNForm data={latestFormData} onSave={d => handleSave('mn_W4MN', d)} isSaving={isSaving} errors={errors} />;
        case 'mo_W4': return <MOW4Form data={latestFormData} onSave={d => handleSave('mo_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ms_89350': return <MS89350Form data={latestFormData} onSave={d => handleSave('ms_89350', d)} isSaving={isSaving} errors={errors} />;
        case 'mt_MW4': return <MTMW4Form data={latestFormData} onSave={d => handleSave('mt_MW4', d)} isSaving={isSaving} errors={errors} />;
        case 'nc_W4': return <NCW4Form data={latestFormData} onSave={d => handleSave('nc_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'nd_W4': return <NDW4Form data={latestFormData} onSave={d => handleSave('nd_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ne_W4N': return <NEW4NForm data={latestFormData} onSave={d => handleSave('ne_W4N', d)} isSaving={isSaving} errors={errors} />;
        case 'oh_IT4': return <OHIT4Form data={latestFormData} onSave={d => handleSave('oh_IT4', d)} isSaving={isSaving} errors={errors} />;
        case 'ok_W4': return <OKW4Form data={latestFormData} onSave={d => handleSave('ok_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'pa_W4': return <PAW4Form data={latestFormData} onSave={d => handleSave('pa_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'ri_W4': return <RIW4Form data={latestFormData} onSave={d => handleSave('ri_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'sc_W4': return <SCW4Form data={latestFormData} onSave={d => handleSave('sc_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'va_W4': return <VAW4Form data={latestFormData} onSave={d => handleSave('va_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'vt_W4': return <VTW4Form data={latestFormData} onSave={d => handleSave('vt_W4', d)} isSaving={isSaving} errors={errors} />;
        case 'wi_WT4': return <WIWT4Form data={latestFormData} onSave={d => handleSave('wi_WT4', d)} isSaving={isSaving} errors={errors} />;
        case 'wv_IT104': return <WVIT104Form data={latestFormData} onSave={d => handleSave('wv_IT104', d)} isSaving={isSaving} errors={errors} />;
        
        // No-tax states
        case 'ak_Acknowledgement':
        case 'fl_Acknowledgement':
        case 'nv_Acknowledgement':
        case 'nh_Acknowledgement':
        case 'sd_Acknowledgement':
        case 'tn_Acknowledgement':
        case 'tx_Acknowledgement':
        case 'wa_Acknowledgement':
        case 'wy_Acknowledgement':
            return <NoStateTaxForm stateName={V.usStates.find(s => s.abbreviation === employee.stateOfResidence)?.name || ''} data={latestFormData} onSave={d => handleSave(activeTabKey as keyof Employee['taxForms'], d)} isSaving={isSaving} errors={errors} />;
        // States using Federal W-4
        case 'nm_Acknowledgement':
        case 'ut_Acknowledgement':
            return <NoStateTaxForm stateName={V.usStates.find(s => s.abbreviation === employee.stateOfResidence)?.name || ''} usesFederalW4={true} data={latestFormData} onSave={d => handleSave(activeTabKey as keyof Employee['taxForms'], d)} isSaving={isSaving} errors={errors} />;
        
        default: return null;
    }
  }

  return (
    <div>
      <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-frappe-blue-600 hover:text-frappe-blue-800 mb-4">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
            <img className="h-16 w-16 rounded-full mr-4" src={employee.avatarUrl} alt={employee.name} />
            <div>
              <h1 className="text-3xl font-bold text-frappe-gray-900">{employee.name}</h1>
              <div className="flex items-center space-x-2">
                <p className="text-frappe-gray-500">{employee.title}</p>
                <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${typeBadgeClasses}`}>
                    {employee.employeeType === 'W2' ? 'W-2 Employee' : '1099 Contractor'}
                </span>
              </div>
            </div>
        </div>
        <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            <EditIcon className="w-4 h-4 mr-2" />
            Edit Profile
        </Button>
      </div>
      
       {hasIncompleteForms && (
         <div className={`mb-4 p-4 border-l-4 ${wasEverOnboarded ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-yellow-50 border-yellow-400 text-yellow-700'}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    {wasEverOnboarded ? <RefreshCwIcon className="h-5 w-5 text-blue-400" /> : <InfoIcon className="h-5 w-5 text-yellow-400" />}
                </div>
                <div className="ml-3">
                    <p className="text-sm">
                        {wasEverOnboarded
                            ? "Profile changes require new forms to be completed. "
                            : "This person has incomplete onboarding documents. "}
                        <Link
                            to={`/employee/${employee.id}/onboard${wasEverOnboarded ? '?flow=update' : ''}`}
                            className={`font-medium underline ${wasEverOnboarded ? 'hover:text-blue-800' : 'hover:text-yellow-800'}`}
                        >
                            {wasEverOnboarded ? 'Complete New Forms' : 'Complete Onboarding Now'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
      )}
      
       {saveError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Save Failed: </strong>
          <span className="block sm:inline">{saveError}</span>
        </div>
      )}

      <Card>
        <div className="border-b border-frappe-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
            {formTabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTabKey(tab.key)} className={`${tabClasses} ${activeTabKey === tab.key ? activeTabClasses : inactiveTabClasses} inline-flex items-center whitespace-nowrap`}>
                {tab.label}
                {getFormStatusIcon(tab.isComplete)}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6">
          {latestFormData ? (
            <>
              {renderActiveForm()}
              <SubmissionHistory submissions={activeSubmissions} />
            </>
          ) : (
             <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No form submitted yet.</h3>
                <p className="text-sm text-gray-500 mt-1">Complete onboarding to submit the required forms.</p>
             </div>
          )}
        </div>
      </Card>
       {isEditModalOpen && (
        <EditEmployeeModal 
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            employee={employee}
            onSave={handleSaveProfile}
        />
       )}
    </div>
  );
};

export default EmployeeDetail;