export type EmployeeType = 'W2' | '1099';
export type ErrorObject = { [key: string]: string };

// FIX: Added 'VT' to the list of US states.
export type USState = 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FL' | 'GA' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';

export interface FormSubmission<T> {
  formData: T;
  submissionDate: string; // YYYY-MM-DD
}

export interface Employee {
  id: number;
  name: string;
  title?: string;
  email?: string;
  avatarUrl: string;
  stateOfResidence: USState;
  employeeType: EmployeeType;
  erpEmployeeName?: string;
  taxForms: {
    // Federal Forms
    i9Form?: FormSubmission<I9FormData>[];
    federalW4?: FormSubmission<FederalW4FormData>[];
    federalW9?: FormSubmission<FederalW9FormData>[];
    // State Forms
    al_A4?: FormSubmission<AL_A4_FormData>[];
    ak_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    az_A4?: FormSubmission<AZ_A4_FormData>[];
    ar_AR4EC?: FormSubmission<AR_AR4EC_FormData>[];
    ca_DE4?: FormSubmission<CA_DE4_FormData>[];
    co_DR0004?: FormSubmission<CO_DR0004_FormData>[];
    ct_W4?: FormSubmission<CT_W4_FormData>[];
    de_W4?: FormSubmission<DE_W4_FormData>[];
    dc_W4?: FormSubmission<DC_W4_FormData>[];
    fl_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    ga_G4?: FormSubmission<GA_G4_FormData>[];
    hi_HW4?: FormSubmission<HI_HW4_FormData>[];
    id_W4?: FormSubmission<ID_W4_FormData>[];
    il_W4?: FormSubmission<IL_W4_FormData>[];
    in_WH4?: FormSubmission<IN_WH4_FormData>[];
    ia_W4?: FormSubmission<IA_W4_FormData>[];
    ks_K4?: FormSubmission<KS_K4_FormData>[];
    ky_K4?: FormSubmission<KY_K4_FormData>[];
    la_L4?: FormSubmission<LA_L4_FormData>[];
    me_W4?: FormSubmission<ME_W4_FormData>[];
    md_MW507?: FormSubmission<MD_MW507_FormData>[];
    ma_M4?: FormSubmission<MA_M4_FormData>[];
    mi_W4?: FormSubmission<MI_W4_FormData>[];
    mn_W4MN?: FormSubmission<MN_W4MN_FormData>[];
    ms_89350?: FormSubmission<MS_89350_FormData>[];
    mo_W4?: FormSubmission<MO_W4_FormData>[];
    mt_MW4?: FormSubmission<MT_MW4_FormData>[];
    ne_W4N?: FormSubmission<NE_W4N_FormData>[];
    nv_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    nh_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    nj_W4?: FormSubmission<NJ_W4_FormData>[];
    nm_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    ny_IT2104?: FormSubmission<NY_IT2104_FormData>[];
    nc_W4?: FormSubmission<NC_W4_FormData>[];
    nd_W4?: FormSubmission<ND_W4_FormData>[];
    oh_IT4?: FormSubmission<OH_IT4_FormData>[];
    ok_W4?: FormSubmission<OK_W4_FormData>[];
    or_W4?: FormSubmission<OR_W4_FormData>[];
    pa_W4?: FormSubmission<PA_W4_FormData>[];
    ri_W4?: FormSubmission<RI_W4_FormData>[];
    sc_W4?: FormSubmission<SC_W4_FormData>[];
    sd_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    tn_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    tx_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    ut_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    vt_W4?: FormSubmission<VT_W4_FormData>[];
    va_W4?: FormSubmission<VA_W4_FormData>[];
    wa_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
    wv_IT104?: FormSubmission<WV_IT104_FormData>[];
    wi_WT4?: FormSubmission<WI_WT4_FormData>[];
    wy_Acknowledgement?: FormSubmission<Acknowledgement_FormData>[];
  }
}

export interface Acknowledgement_FormData {
    formYear: number;
    hasAcknowledged: boolean;
}

export enum FilingStatus {
  SINGLE = 'Single or Married filing separately',
  MARRIED_JOINTLY = 'Married filing jointly (or Qualifying widow(er))',
  HEAD_OF_HOUSEHOLD = 'Head of Household'
}

export interface FederalW4FormData {
  formYear: number;
  filingStatus: FilingStatus;
  multipleJobs: boolean;
  qualifyingChildrenAmount: number;
  otherDependentsAmount: number;
  otherIncome: number;
  deductions: number;
  extraWithholding: number;
  isExempt?: boolean;
  exemptionReason?: string;
}

export enum FederalTaxClassification {
    INDIVIDUAL = 'Individual/sole proprietor or single-member LLC',
    C_CORPORATION = 'C Corporation',
    S_CORPORATION = 'S Corporation',
    PARTNERSHIP = 'Partnership',
    TRUST_ESTATE = 'Trust/estate',
    LLC = 'Limited liability company',
    OTHER = 'Other'
}

export interface FederalW9FormData {
    formVersion: string;
    name: string; // For business name if applicable, or full name
    businessName?: string;
    taxClassification: FederalTaxClassification;
    address: string;
    city: string;
    state: string;
    zip: string;
    county?: string;
    ssn?: string;
    ein?: string;
    fein?: string;
    requesterNameAndAddress?: string;
    firstName?: string;
    lastName?: string;
    middleInitial?: string;
}

// Per-state form data interfaces below

export enum ALFilingStatus {
    SINGLE = 'Single',
    MARRIED_FILING_JOINTLY = 'Married Filing Jointly',
    MARRIED_FILING_SEPARATELY = 'Married Filing Separately',
    HEAD_OF_FAMILY = 'Head of Family',
}
export interface AL_A4_FormData {
    formYear: number;
    filingStatus: ALFilingStatus;
    dependentAllowances: number;
    additionalWithholding: number;
}

export interface AZ_A4_FormData {
    formYear: number;
    withholdingRate: '0.8' | '1.3' | '1.8' | '2.7' | '3.6' | '4.2' | '0';
    additionalWithholding: number;
}

export enum ARFilingStatus {
    SINGLE_OR_HEAD_OF_HOUSEHOLD = 'Single or Head of Household',
    MARRIED_FILING_JOINTLY_OR_QUALIFYING_WIDOW = 'Married Filing Jointly or Qualifying Widow(er)',
    MARRIED_FILING_SEPARATELY = 'Married Filing Separately',
}
export interface AR_AR4EC_FormData {
    formYear: number;
    filingStatus: ARFilingStatus;
    totalAllowances: number;
    additionalWithholding: number;
}

export interface CO_DR0004_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
}

export enum CTFilingStatus {
    A = 'A - For married filing jointly and qualifying widow(er) with dependent child',
    B = 'B - For single or married filing separately',
    C = 'C - For married filing jointly with two or more incomes or multiple jobs',
    D = 'D - For head of household',
    E = 'E - Exempt',
}
export interface CT_W4_FormData {
    formYear: number;
    // FIX: Changed type from `CTFilingStatus` to `keyof typeof CTFilingStatus` to match form implementation.
    withholdingCode: keyof typeof CTFilingStatus;
    additionalWithholding: number;
    exemptionReason?: string;
}
export interface DC_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}
export interface DE_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum GAFilingStatus {
    SINGLE = 'Single',
    MARRIED_FILING_JOINTLY_ONE_SPOUSE_WORKING = 'Married filing jointly (one spouse working)',
    MARRIED_FILING_JOINTLY_BOTH_SPOUSES_WORKING = 'Married filing jointly (both spouses working)',
    MARRIED_FILING_SEPARATELY = 'Married filing separately',
    HEAD_OF_HOUSEHOLD = 'Head of Household',
}
export interface GA_G4_FormData {
    formYear: number;
    filingStatus: GAFilingStatus;
    dependentAllowances: number;
    additionalWithholding: number;
}

export interface HI_HW4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export interface IA_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
}

export interface ID_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum KSFilingStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
}
export interface KS_K4_FormData {
    formYear: number;
    filingStatus: KSFilingStatus;
    allowances: number;
    additionalWithholding: number;
}

export interface KY_K4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    localTaxJurisdiction?: string;
}
export interface LA_L4_FormData {
    formYear: number;
    exemptions: number;
    dependents: number;
    additionalWithholding: number;
}

export enum MEFilingStatus {
    SINGLE_OR_MARRIED_FILING_SEPARATELY = 'Single or Married Filing Separately',
    MARRIED_FILING_JOINTLY_OR_QUALIFYING_WIDOW = 'Married Filing Jointly or Qualifying Widow(er)',
    HEAD_OF_HOUSEHOLD = 'Head of Household',
}
export interface ME_W4_FormData {
    formYear: number;
    filingStatus: MEFilingStatus;
    allowances: number;
    additionalWithholding: number;
}
export interface MD_MW507_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
    exemptions: number;
    residenceZipCode?: string;
    countyOfResidence: string;
    additionalWithholding: number;
}

export interface MA_M4_FormData {
    formYear: number;
    exemptions: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export interface MI_W4_FormData {
    formYear: number;
    exemptions: number;
    additionalWithholding: number;
}

export enum MNFilingStatus {
    SINGLE = 'Single',
    MARRIED_JOINTLY = 'Married',
    MARRIED_SEPARATELY = 'Married, but withhold at Single rate',
}
export interface MN_W4MN_FormData {
    formYear: number;
    filingStatus: MNFilingStatus;
    allowances: number;
    additionalWithholding: number;
}
export interface MO_W4_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
    allowances: number;
    additionalWithholding: number;
}

export enum MSFilingStatus {
    SINGLE = 'Single',
    MARRIED_ONE_SPOUSE_EMPLOYED = 'Married (one spouse employed)',
    MARRIED_BOTH_SPOUSES_EMPLOYED = 'Married (both spouses employed)',
    HEAD_OF_HOUSEHOLD = 'Head of Household',
}
export interface MS_89350_FormData {
    formYear: number;
    filingStatus: MSFilingStatus;
    exemptions: number;
    additionalWithholding: number;
}
export interface MT_MW4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}
export interface NC_W4_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
    allowances: number;
    additionalWithholding: number;
}
export interface ND_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum NEFilingStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
}
export interface NE_W4N_FormData {
    formYear: number;
    filingStatus: NEFilingStatus;
    allowances: number;
    additionalWithholding: number;
}

export interface OH_IT4_FormData {
    formYear: number;
    exemptions: number;
    schoolDistrictNumber: string;
    additionalWithholding: number;
}
export interface OK_W4_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately';
    allowances: number;
    additionalWithholding: number;
}
export interface PA_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}
export interface RI_W4_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately';
    allowances: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}

export enum SCFilingStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
}
export interface SC_W4_FormData {
    formYear: number;
    filingStatus: SCFilingStatus;
    allowances: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}
export interface VA_W4_FormData {
    formYear: number;
    exemptions: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}
export interface VT_W4_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
    allowances: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}

export enum WIFilingStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
    MARRIED_WITHHOLD_AT_SINGLE = 'Married, but withhold at single rate',
}
export interface WI_WT4_FormData {
    formYear: number;
    filingStatus: WIFilingStatus;
    allowances: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}

export interface WV_IT104_FormData {
    formYear: number;
    filingStatus: 'single' | 'married_jointly' | 'married_separately' | 'head_of_household';
    exemptions: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}

// Existing Forms below

export enum NYFilingStatus {
    SINGLE = 'Single',
    MARRIED_JOINTLY = 'Married filing jointly',
    MARRIED_SEPARATELY = 'Married filing separately',
    HEAD_OF_HOUSEHOLD = 'Head of household',
    QUALIFYING_WIDOW = 'Qualifying widow(er)',
}

export interface NY_IT2104_FormData {
    formYear: number;
    filingStatus: NYFilingStatus;
    totalAllowances: number;
    isNYCResident: boolean;
    nycAllowances: number;
    isYonkersResident: boolean;
    yonkersAllowances: number;
    additionalWithholding: number;
    isExempt?: boolean;
    exemptionReason?: string;
}

export enum NJFilingStatus {
    SINGLE = 'Single',
    MARRIED_JOINTLY = 'Married/CU Partner Jointly',
    MARRIED_SEPARATELY = 'Married/CU Partner Separately',
    HEAD_OF_HOUSEHOLD = 'Head of Household',
    QUALIFYING_WIDOW = 'Qualifying Widow(er)/Surviving CU Partner',
}

export interface NJ_W4_FormData {
    formYear: number;
    filingStatus: NJFilingStatus;
    withholdingRate: 'A' | 'B' | 'C' | 'D' | 'E';
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum CAFilingStatus {
    SINGLE = 'Single or Married (with two or more incomes)',
    MARRIED = 'Married (one income)',
    HEAD_OF_HOUSEHOLD = 'Head of Household'
}

export interface CA_DE4_FormData {
    formYear: number;
    filingStatus: CAFilingStatus;
    totalAllowances: number;
    additionalWithholding: number;
}

export interface IN_WH4_FormData {
    formYear: number;
    personalExemptions: number;
    dependentExemptions: number;
    additionalExemptions: number;
    residenceZipCode?: string;
    countyOfResidence: string;
    workZipCode?: string;
    countyOfPrincipalWork: string;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum ORFilingStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
    MARRIED_SEPARATELY_SAME = 'Married filing separately on the same return',
    MARRIED_SEPARATELY_DIFFERENT = 'Married filing separately on different returns',
}

export interface OR_W4_FormData {
    formYear: number;
    filingStatus: ORFilingStatus;
    allowances: number;
    isExempt: boolean;
    isExemptForMilitarySpouse: boolean;
    nonwageIncome: number;
    deductions: number;
    additionalWithholding: number;
    exemptionReason?: string;
}

export interface IL_W4_FormData {
    formYear: number;
    allowances: number;
    additionalWithholding: number;
    isExempt: boolean;
    exemptionReason?: string;
}

export enum CitizenshipStatus {
    US_CITIZEN = 'A citizen of the United States',
    US_NONCITIZEN_NATIONAL = 'A noncitizen national of the United States',
    LAWFUL_PERMANENT_RESIDENT = 'A lawful permanent resident',
    ALIEN_AUTHORIZED_TO_WORK = 'An alien authorized to work'
}

export interface DocumentInfo {
    title: string;
    issuingAuthority: string;
    documentNumber: string;
    expirationDate?: string; // Optional as some documents don't expire
}

export interface I9FormData {
    formVersion: string;
    // Section 1: Employee Information
    lastName: string;
    firstName: string;
    middleInitial: string;
    otherLastNames?: string;
    address: string;
    aptNumber?: string;
    city: string;
    county?: string;
    state: string;
    zipCode: string;
    dateOfBirth: string; // YYYY-MM-DD
    socialSecurityNumber: string;
    emailAddress?: string;
    telephoneNumber?: string;
    employee?: string;
    employeeId?: string;
    first_name: string;
  last_name: string;
  middle_initial?: string;
  erpEmployeeName?: string;
    // Section 1: Attestation
    citizenshipStatus: CitizenshipStatus;
    uscisNumber?: string;
    formI94AdmissionNumber?: string;
    foreignPassportNumber?: string;
    countryOfIssuance?: string;

    // Section 2: Employer Review and Verification
    listADocument?: DocumentInfo;
    listBDocument?: DocumentInfo;
    listCDocument?: DocumentInfo;
}