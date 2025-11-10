
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeDetail from './pages/EmployeeDetail';
import Onboarding from './pages/Onboarding';
import {
  I9FormData, FederalW4FormData, NY_IT2104_FormData, NJ_W4_FormData, CitizenshipStatus, FilingStatus, NYFilingStatus, NJFilingStatus,
  FederalW9FormData, FederalTaxClassification, CA_DE4_FormData, CAFilingStatus, IN_WH4_FormData, OR_W4_FormData, ORFilingStatus, IL_W4_FormData,
  Acknowledgement_FormData, AL_A4_FormData, ALFilingStatus, AR_AR4EC_FormData, ARFilingStatus, AZ_A4_FormData, CO_DR0004_FormData, CT_W4_FormData, CTFilingStatus,
  DC_W4_FormData, DE_W4_FormData, GA_G4_FormData, GAFilingStatus, HI_HW4_FormData, IA_W4_FormData, ID_W4_FormData, KS_K4_FormData, KSFilingStatus,
  KY_K4_FormData, LA_L4_FormData, MA_M4_FormData, MD_MW507_FormData, ME_W4_FormData, MEFilingStatus, MI_W4_FormData, MN_W4MN_FormData, MNFilingStatus,
  MO_W4_FormData, MS_89350_FormData, MSFilingStatus, MT_MW4_FormData, NC_W4_FormData, ND_W4_FormData, NE_W4N_FormData, NEFilingStatus, OH_IT4_FormData,
  OK_W4_FormData, PA_W4_FormData, RI_W4_FormData, SC_W4_FormData, SCFilingStatus, VA_W4_FormData, VT_W4_FormData, WI_WT4_FormData, WIFilingStatus, WV_IT104_FormData
} from './types';
import { ToastProvider } from './contexts/ToastContext';
import { EmployeeProfileProvider } from './contexts/EmployeeProfileContext';

// Default form data for new employees
const currentYear = new Date().getFullYear();

export const defaultI9: I9FormData = {
    formVersion: 'Rev. 10/21/2019',
    lastName: '', firstName: '', middleInitial: '', address: '', city: '', county: '', state: '', zipCode: '',
    dateOfBirth: '', socialSecurityNumber: '', citizenshipStatus: CitizenshipStatus.US_CITIZEN,
};
export const defaultW4: FederalW4FormData = {
    formYear: currentYear,
    filingStatus: FilingStatus.SINGLE, multipleJobs: false, qualifyingChildrenAmount: 0, otherDependentsAmount: 0,
    otherIncome: 0, deductions: 0, extraWithholding: 0, isExempt: false, exemptionReason: '',
};
export const defaultW9: FederalW9FormData = {
    formVersion: 'Rev. October 2018',
    name: '', businessName: '', taxClassification: FederalTaxClassification.INDIVIDUAL, address: '', city: '', state: '', zip: '', county: '',
    ssn: '', ein: '', fein: '', requesterNameAndAddress: '', firstName: '', lastName: '', middleInitial: '',
};

// Generic acknowledgement for no-tax states
export const defaultAcknowledgement: Acknowledgement_FormData = {
    formYear: currentYear,
    hasAcknowledged: false,
};

// State-specific defaults
export const defaultAL: AL_A4_FormData = { formYear: currentYear, filingStatus: ALFilingStatus.SINGLE, dependentAllowances: 0, additionalWithholding: 0 };
export const defaultAZ: AZ_A4_FormData = { formYear: currentYear, withholdingRate: '2.7', additionalWithholding: 0 };
export const defaultAR: AR_AR4EC_FormData = { formYear: currentYear, filingStatus: ARFilingStatus.SINGLE_OR_HEAD_OF_HOUSEHOLD, totalAllowances: 0, additionalWithholding: 0 };
export const defaultCA: CA_DE4_FormData = { formYear: currentYear, filingStatus: CAFilingStatus.SINGLE, totalAllowances: 0, additionalWithholding: 0 };
export const defaultCO: CO_DR0004_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0 };
// FIX: Changed withholdingCode to 'B' to match the corrected type `keyof typeof CTFilingStatus`.
export const defaultCT: CT_W4_FormData = { formYear: currentYear, withholdingCode: 'B', additionalWithholding: 0, exemptionReason: '' };
export const defaultDC: DC_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultDE: DE_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultGA: GA_G4_FormData = { formYear: currentYear, filingStatus: GAFilingStatus.SINGLE, dependentAllowances: 0, additionalWithholding: 0 };
export const defaultHI: HI_HW4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultIA: IA_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0 };
export const defaultID: ID_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultIL: IL_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultIN: IN_WH4_FormData = { formYear: currentYear, personalExemptions: 0, dependentExemptions: 0, additionalExemptions: 0, residenceZipCode: '', countyOfResidence: '', workZipCode: '', countyOfPrincipalWork: '', additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultKS: KS_K4_FormData = { formYear: currentYear, filingStatus: KSFilingStatus.SINGLE, allowances: 0, additionalWithholding: 0 };
export const defaultKY: KY_K4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, localTaxJurisdiction: '' };
export const defaultLA: LA_L4_FormData = { formYear: currentYear, exemptions: 0, dependents: 0, additionalWithholding: 0 };
export const defaultMA: MA_M4_FormData = { formYear: currentYear, exemptions: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultMD: MD_MW507_FormData = { formYear: currentYear, filingStatus: 'single', exemptions: 0, residenceZipCode: '', countyOfResidence: '', additionalWithholding: 0 };
export const defaultME: ME_W4_FormData = { formYear: currentYear, filingStatus: MEFilingStatus.SINGLE_OR_MARRIED_FILING_SEPARATELY, allowances: 0, additionalWithholding: 0 };
export const defaultMI: MI_W4_FormData = { formYear: currentYear, exemptions: 0, additionalWithholding: 0 };
export const defaultMN: MN_W4MN_FormData = { formYear: currentYear, filingStatus: MNFilingStatus.SINGLE, allowances: 0, additionalWithholding: 0 };
export const defaultMO: MO_W4_FormData = { formYear: currentYear, filingStatus: 'single', allowances: 0, additionalWithholding: 0 };
export const defaultMS: MS_89350_FormData = { formYear: currentYear, filingStatus: MSFilingStatus.SINGLE, exemptions: 0, additionalWithholding: 0 };
export const defaultMT: MT_MW4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultNC: NC_W4_FormData = { formYear: currentYear, filingStatus: 'single', allowances: 0, additionalWithholding: 0 };
export const defaultND: ND_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultNE: NE_W4N_FormData = { formYear: currentYear, filingStatus: NEFilingStatus.SINGLE, allowances: 0, additionalWithholding: 0 };
export const defaultNJ: NJ_W4_FormData = { formYear: currentYear, filingStatus: NJFilingStatus.SINGLE, withholdingRate: 'C', allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultNY: NY_IT2104_FormData = { formYear: currentYear, filingStatus: NYFilingStatus.SINGLE, totalAllowances: 0, isNYCResident: false, nycAllowances: 0, isYonkersResident: false, yonkersAllowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultOH: OH_IT4_FormData = { formYear: currentYear, exemptions: 0, schoolDistrictNumber: '', additionalWithholding: 0 };
export const defaultOK: OK_W4_FormData = { formYear: currentYear, filingStatus: 'single', allowances: 0, additionalWithholding: 0 };
export const defaultOR: OR_W4_FormData = { formYear: currentYear, filingStatus: ORFilingStatus.SINGLE, allowances: 0, isExempt: false, isExemptForMilitarySpouse: false, nonwageIncome: 0, deductions: 0, additionalWithholding: 0, exemptionReason: '' };
export const defaultPA: PA_W4_FormData = { formYear: currentYear, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultRI: RI_W4_FormData = { formYear: currentYear, filingStatus: 'single', allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultSC: SC_W4_FormData = { formYear: currentYear, filingStatus: SCFilingStatus.SINGLE, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultVA: VA_W4_FormData = { formYear: currentYear, exemptions: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultVT: VT_W4_FormData = { formYear: currentYear, filingStatus: 'single', allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultWI: WI_WT4_FormData = { formYear: currentYear, filingStatus: WIFilingStatus.SINGLE, allowances: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };
export const defaultWV: WV_IT104_FormData = { formYear: currentYear, filingStatus: 'single', exemptions: 0, additionalWithholding: 0, isExempt: false, exemptionReason: '' };

function App() {
  return (
    <EmployeeProfileProvider>
      <ToastProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/employee/:id/onboard" element={<Onboarding />} />
            </Routes>
          </Layout>
        </HashRouter>
      </ToastProvider>
    </EmployeeProfileProvider>
  );
}

export default App;
