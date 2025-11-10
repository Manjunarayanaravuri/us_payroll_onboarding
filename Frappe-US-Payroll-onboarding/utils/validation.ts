import { 
    NY_IT2104_FormData, NJ_W4_FormData, Acknowledgement_FormData, CA_DE4_FormData, IN_WH4_FormData, OR_W4_FormData, IL_W4_FormData,
    AL_A4_FormData, AZ_A4_FormData, AR_AR4EC_FormData, CO_DR0004_FormData, CT_W4_FormData, DC_W4_FormData, DE_W4_FormData,
    GA_G4_FormData, HI_HW4_FormData, IA_W4_FormData, ID_W4_FormData, KS_K4_FormData, KY_K4_FormData, LA_L4_FormData, ME_W4_FormData,
    MD_MW507_FormData, MA_M4_FormData, MI_W4_FormData, MN_W4MN_FormData, MS_89350_FormData, MO_W4_FormData, MT_MW4_FormData,
    NC_W4_FormData, ND_W4_FormData, NE_W4N_FormData, OH_IT4_FormData, OK_W4_FormData, PA_W4_FormData, RI_W4_FormData, SC_W4_FormData,
    VA_W4_FormData, VT_W4_FormData, WI_WT4_FormData, WV_IT104_FormData, Employee, FederalW4FormData, FederalW9FormData, I9FormData
} from '../types';

type ErrorObject = { [key: string]: string };

export const validateNYIT2104 = (data: NY_IT2104_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.totalAllowances < 0) {
        errors.totalAllowances = "Total allowances cannot be negative.";
    }
    if (data.isNYCResident && data.nycAllowances < 0) {
        errors.nycAllowances = "NYC allowances cannot be negative.";
    }
    if (data.isYonkersResident && data.yonkersAllowances < 0) {
        errors.yonkersAllowances = "Yonkers allowances cannot be negative.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

export const validateNJW4 = (data: NJ_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.allowances < 0) {
        errors.allowances = "Allowances cannot be negative.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

// FIX: Renamed from validateFLAcknowledgement and corrected type to be generic for all acknowledgement forms.
export const validateAcknowledgement = (data: Acknowledgement_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (!data.hasAcknowledged) {
        errors.hasAcknowledged = "You must acknowledge this statement to proceed.";
    }
    return errors;
};

export const validateCADE4 = (data: CA_DE4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.totalAllowances < 0) {
        errors.totalAllowances = "Total allowances cannot be negative.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

export const validateINWH4 = (data: IN_WH4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.personalExemptions < 0) {
        errors.personalExemptions = "Personal exemptions cannot be negative.";
    }
    if (data.dependentExemptions < 0) {
        errors.dependentExemptions = "Dependent exemptions cannot be negative.";
    }
    if (data.additionalExemptions < 0) {
        errors.additionalExemptions = "Additional exemptions cannot be negative.";
    }
    if (!data.countyOfResidence) {
        errors.countyOfResidence = "Please select your county of residence.";
    }
    if (!data.countyOfPrincipalWork) {
        errors.countyOfPrincipalWork = "Please select your county of principal work.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

export const validateORW4 = (data: OR_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.allowances < 0) {
        errors.allowances = "Allowances cannot be negative.";
    }
    if (data.nonwageIncome < 0) {
        errors.nonwageIncome = "Nonwage income cannot be negative.";
    }
    if (data.deductions < 0) {
        errors.deductions = "Deductions cannot be negative.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

export const validateILW4 = (data: IL_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.allowances < 0) {
        errors.allowances = "Allowances cannot be negative.";
    }
    if (data.additionalWithholding < 0) {
        errors.additionalWithholding = "Additional withholding cannot be negative.";
    }
    return errors;
};

// FIX: Added all missing validation functions below.
const validateNonNegative = (errors: ErrorObject, data: any, field: string, message: string) => {
    if (data[field] < 0) {
        errors[field] = message;
    }
};

export const validateFederalW4 = (data: FederalW4FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'qualifyingChildrenAmount', "Amount cannot be negative.");
    validateNonNegative(errors, data, 'otherDependentsAmount', "Amount cannot be negative.");
    validateNonNegative(errors, data, 'otherIncome', "Amount cannot be negative.");
    validateNonNegative(errors, data, 'deductions', "Amount cannot be negative.");
    validateNonNegative(errors, data, 'extraWithholding', "Amount cannot be negative.");
    return errors;
};

export const validateFederalW9 = (data: FederalW9FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (data.taxClassification === 'Individual/sole proprietor or single-member LLC') {
        if (!data.firstName?.trim()) errors.firstName = "First Name is required for individuals.";
        if (!data.lastName?.trim()) errors.lastName = "Last Name is required for individuals.";
    } else {
        if (!data.name?.trim()) errors.name = "Name is required.";
    }
    if (!data.address?.trim()) errors.address = "Address is required.";
    if (!data.city?.trim()) errors.city = "City is required.";
    if (!data.state?.trim()) errors.state = "State is required.";
    if (!data.zip?.trim()) errors.zip = "ZIP code is required.";
    if (!data.ssn?.trim() && !data.ein?.trim()) {
        errors.ssn = "Either an SSN or an EIN is required.";
        errors.ein = "Either an SSN or an EIN is required.";
    }
    return errors;
};

export const validateI9Form = (data: I9FormData): ErrorObject => {
    const errors: ErrorObject = {};
    if (!data.lastName?.trim()) errors.lastName = "Last Name is required.";
    if (!data.firstName?.trim()) errors.firstName = "First Name is required.";
    if (!data.address?.trim()) errors.address = "Address is required.";
    if (!data.city?.trim()) errors.city = "City is required.";
    if (!data.state?.trim()) errors.state = "State is required.";
    if (!data.zipCode?.trim()) errors.zipCode = "ZIP Code is required.";
    if (!data.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
    if (!data.socialSecurityNumber?.trim()) errors.socialSecurityNumber = "Social Security Number is required.";
    
    const hasListA = data.listADocument?.title?.trim() && data.listADocument?.issuingAuthority?.trim() && data.listADocument?.documentNumber?.trim();
    const hasListB = data.listBDocument?.title?.trim() && data.listBDocument?.issuingAuthority?.trim() && data.listBDocument?.documentNumber?.trim();
    const hasListC = data.listCDocument?.title?.trim() && data.listCDocument?.issuingAuthority?.trim() && data.listCDocument?.documentNumber?.trim();

    if (!hasListA && !(hasListB && hasListC)) {
        errors.listADocument = "You must provide one document from List A OR one from List B and one from List C.";
    }

    return errors;
};


export const validateALA4 = (data: AL_A4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'dependentAllowances', "Dependent allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateAZA4 = (data: AZ_A4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateARAR4EC = (data: AR_AR4EC_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'totalAllowances', "Total allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateCODR0004 = (data: CO_DR0004_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateCTW4 = (data: CT_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateDCW4 = (data: DC_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateDEW4 = (data: DE_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateGAG4 = (data: GA_G4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'dependentAllowances', "Dependent allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateHIHW4 = (data: HI_HW4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateIAW4 = (data: IA_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateIDW4 = (data: ID_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateKSK4 = (data: KS_K4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateKYK4 = (data: KY_K4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateLAL4 = (data: LA_L4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'dependents', "Dependents cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMDMW507 = (data: MD_MW507_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    if (!data.countyOfResidence) {
        errors.countyOfResidence = "County of residence is required.";
    }
    return errors;
};

export const validateMAM4 = (data: MA_M4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMEW4 = (data: ME_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMIW4 = (data: MI_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMNW4MN = (data: MN_W4MN_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMOW4 = (data: MO_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMS89350 = (data: MS_89350_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateMTMW4 = (data: MT_MW4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateNCW4 = (data: NC_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateNDW4 = (data: ND_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateNEW4N = (data: NE_W4N_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateOHIT4 = (data: OH_IT4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    if (!data.schoolDistrictNumber) {
        errors.schoolDistrictNumber = "School district number is required.";
    }
    return errors;
};

export const validateOKW4 = (data: OK_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validatePAW4 = (data: PA_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateRIW4 = (data: RI_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateSCW4 = (data: SC_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateVAW4 = (data: VA_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateVTW4 = (data: VT_W4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateWIWT4 = (data: WI_WT4_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'allowances', "Allowances cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const validateWVIT104 = (data: WV_IT104_FormData): ErrorObject => {
    const errors: ErrorObject = {};
    validateNonNegative(errors, data, 'exemptions', "Exemptions cannot be negative.");
    validateNonNegative(errors, data, 'additionalWithholding', "Additional withholding cannot be negative.");
    return errors;
};

export const usStates = [
    { name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' }, { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' }, { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' }, { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' }, { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' }, { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' }, { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' }, { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' }, { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' }, { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' }, { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' }, { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' }, { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' }, { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' }, { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' }, { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' }, { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' }, { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' }, { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' }, { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' }, { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' }, { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' }, { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
];

export const indianaCounties = [
    "Adams", "Allen", "Bartholomew", "Benton", "Blackford", "Boone", "Brown", "Carroll", "Cass", "Clark",
    "Clay", "Clinton", "Crawford", "Daviess", "Dearborn", "Decatur", "DeKalb", "Delaware", "Dubois", "Elkhart",
    "Fayette", "Floyd", "Fountain", "Franklin", "Fulton", "Gibson", "Grant", "Greene", "Hamilton", "Hancock",
    "Harrison", "Hendricks", "Henry", "Howard", "Huntington", "Jackson", "Jasper", "Jay", "Jefferson", "Jennings",
    "Johnson", "Knox", "Kosciusko", "LaGrange", "Lake", "LaPorte", "Lawrence", "Madison", "Marion", "Marshall",
    "Martin", "Miami", "Monroe", "Montgomery", "Morgan", "Newton", "Noble", "Ohio", "Orange", "Owen",
    "Parke", "Perry", "Pike", "Porter", "Posey", "Pulaski", "Putnam", "Randolph", "Ripley", "Rush",
    "St. Joseph", "Scott", "Shelby", "Spencer", "Starke", "Steuben", "Sullivan", "Switzerland", "Tippecanoe", "Tipton",
    "Union", "Vanderburgh", "Vermillion", "Vigo", "Wabash", "Warren", "Warrick", "Washington", "Wayne", "Wells",
    "White", "Whitley"
];

// FIX: Added Maryland counties for MDMW507Form dropdown.
export const marylandCounties = [
    "Allegany", "Anne Arundel", "Baltimore", "Baltimore City", "Calvert", "Caroline", "Carroll", "Cecil", "Charles", "Dorchester", "Frederick", "Garrett", "Harford", "Howard", "Kent", "Montgomery", "Prince George's", "Queen Anne's", "St. Mary's", "Somerset", "Talbot", "Washington", "Wicomico", "Worcester"
];


// NOTE: This is an expanded sample dataset for demonstration purposes. 
// In a real-world application, this data would ideally come from an API for accuracy and completeness.
export const zipCodeCityCountyData: { [key: string]: { [key: string]: { city: string, county: string } } } = {
  'AL': {
    '35203': { city: 'Birmingham', county: 'Jefferson' }, '36602': { city: 'Mobile', county: 'Mobile' },
    '36104': { city: 'Montgomery', county: 'Montgomery' }, '35801': { city: 'Huntsville', county: 'Madison' },
    '35401': { city: 'Tuscaloosa', county: 'Tuscaloosa' },
  },
  'AK': {
    '99501': { city: 'Anchorage', county: 'Anchorage' }, '99701': { city: 'Fairbanks', county: 'Fairbanks North Star' },
    '99801': { city: 'Juneau', county: 'Juneau' }, '99615': { city: 'Kodiak', county: 'Kodiak Island' },
    '99901': { city: 'Ketchikan', county: 'Ketchikan Gateway' },
  },
  'AZ': {
    '85001': { city: 'Phoenix', county: 'Maricopa' }, '85701': { city: 'Tucson', county: 'Pima' },
    '85201': { city: 'Mesa', county: 'Maricopa' }, '86001': { city: 'Flagstaff', county: 'Coconino' },
    '86301': { city: 'Prescott', county: 'Yavapai' },
  },
  'AR': {
    '72201': { city: 'Little Rock', county: 'Pulaski' }, '72701': { city: 'Fayetteville', county: 'Washington' },
    '72901': { city: 'Fort Smith', county: 'Sebastian' }, '72401': { city: 'Jonesboro', county: 'Craighead' },
    '71901': { city: 'Hot Springs', county: 'Garland' },
  },
  'CA': {
    '90210': { city: 'Beverly Hills', county: 'Los Angeles' }, '90001': { city: 'Los Angeles', county: 'Los Angeles' },
    '92101': { city: 'San Diego', county: 'San Diego' }, '95110': { city: 'San Jose', county: 'Santa Clara' },
    '94102': { city: 'San Francisco', county: 'San Francisco' }, '95814': { city: 'Sacramento', county: 'Sacramento' },
    '94601': { city: 'Oakland', county: 'Alameda' },
  },
  'CO': {
    '80202': { city: 'Denver', county: 'Denver' }, '80903': { city: 'Colorado Springs', county: 'El Paso' },
    '80302': { city: 'Boulder', county: 'Boulder' }, '80521': { city: 'Fort Collins', county: 'Larimer' },
    '81611': { city: 'Aspen', county: 'Pitkin' },
  },
  'CT': {
    '06103': { city: 'Hartford', county: 'Hartford' }, '06510': { city: 'New Haven', county: 'New Haven' },
    '06901': { city: 'Stamford', county: 'Fairfield' }, '06604': { city: 'Bridgeport', county: 'Fairfield' },
    '06702': { city: 'Waterbury', county: 'New Haven' },
  },
  'DE': {
    '19801': { city: 'Wilmington', county: 'New Castle' }, '19901': { city: 'Dover', county: 'Kent' },
    '19711': { city: 'Newark', county: 'New Castle' }, '19958': { city: 'Milford', county: 'Kent' },
    '19971': { city: 'Rehoboth Beach', county: 'Sussex' },
  },
  'DC': {
    '20001': { city: 'Washington', county: 'District of Columbia' }, '20002': { city: 'Washington', county: 'District of Columbia' },
    '20003': { city: 'Washington', county: 'District of Columbia' }, '20004': { city: 'Washington', county: 'District of Columbia' },
    '20005': { city: 'Washington', county: 'District of Columbia' },
  },
  'FL': {
    '33139': { city: 'Miami Beach', county: 'Miami-Dade' }, '33125': { city: 'Miami', county: 'Miami-Dade' },
    '32801': { city: 'Orlando', county: 'Orange' }, '33602': { city: 'Tampa', county: 'Hillsborough' },
    '33301': { city: 'Fort Lauderdale', county: 'Broward' }, '32202': { city: 'Jacksonville', county: 'Duval' },
  },
  'GA': {
    '30303': { city: 'Atlanta', county: 'Fulton' }, '31401': { city: 'Savannah', county: 'Chatham' },
    '30901': { city: 'Augusta', county: 'Richmond' }, '31201': { city: 'Macon', county: 'Bibb' },
    '30601': { city: 'Athens', county: 'Clarke' },
  },
  'HI': {
    '96813': { city: 'Honolulu', county: 'Honolulu' }, '96720': { city: 'Hilo', county: 'Hawaii' },
    '96732': { city: 'Kaunakakai', county: 'Maui' }, '96753': { city: 'Kailua-Kona', county: 'Hawaii' },
    '96766': { city: 'Lihue', county: 'Kauai' },
  },
  'ID': {
    '83702': { city: 'Boise', county: 'Ada' }, '83401': { city: 'Idaho Falls', county: 'Bonneville' },
    '83814': { city: 'Coeur d\'Alene', county: 'Kootenai' }, '83440': { city: 'Rexburg', county: 'Madison' },
    '83301': { city: 'Twin Falls', county: 'Twin Falls' },
  },
  'IL': {
    '60601': { city: 'Chicago', county: 'Cook' }, '60607': { city: 'Chicago', county: 'Cook' },
    '60614': { city: 'Chicago', county: 'Cook' }, '60505': { city: 'Aurora', county: 'Kane' },
    '61101': { city: 'Rockford', county: 'Winnebago' }, '60435': { city: 'Joliet', county: 'Will' },
    '60540': { city: 'Naperville', county: 'DuPage' }, '62701': { city: 'Springfield', county: 'Sangamon' },
  },
  'IN': {
    '46201': { city: 'Indianapolis', county: 'Marion' }, '46202': { city: 'Indianapolis', county: 'Marion' },
    '46802': { city: 'Fort Wayne', county: 'Allen' }, '47708': { city: 'Evansville', county: 'Vanderburgh' },
    '46614': { city: 'South Bend', county: 'St. Joseph' }, '47401': { city: 'Bloomington', county: 'Monroe' },
    '47906': { city: 'Lafayette', county: 'Tippecanoe' }, '46032': { city: 'Carmel', county: 'Hamilton' },
  },
  'IA': {
    '50309': { city: 'Des Moines', county: 'Polk' }, '52402': { city: 'Cedar Rapids', county: 'Linn' },
    '52801': { city: 'Davenport', county: 'Scott' }, '51101': { city: 'Sioux City', county: 'Woodbury' },
    '52240': { city: 'Iowa City', county: 'Johnson' },
  },
  'KS': {
    '67202': { city: 'Wichita', county: 'Sedgwick' }, '66202': { city: 'Overland Park', county: 'Johnson' },
    '66101': { city: 'Kansas City', county: 'Wyandotte' }, '66603': { city: 'Topeka', county: 'Shawnee' },
    '66044': { city: 'Lawrence', county: 'Douglas' },
  },
  'KY': {
    '40202': { city: 'Louisville', county: 'Jefferson' }, '40203': { city: 'Louisville', county: 'Jefferson' },
    '40507': { city: 'Lexington', county: 'Fayette' }, '40508': { city: 'Lexington', county: 'Fayette' },
    '41011': { city: 'Covington', county: 'Kenton' }, '42101': { city: 'Bowling Green', county: 'Warren' },
  },
  'LA': {
    '70112': { city: 'New Orleans', county: 'Orleans' }, '70802': { city: 'Baton Rouge', county: 'East Baton Rouge' },
    '71101': { city: 'Shreveport', county: 'Caddo' }, '70501': { city: 'Lafayette', county: 'Lafayette' },
    '70601': { city: 'Lake Charles', county: 'Calcasieu' },
  },
  'ME': {
    '04101': { city: 'Portland', county: 'Cumberland' }, '04330': { city: 'Augusta', county: 'Kennebec' },
    '04401': { city: 'Bangor', county: 'Penobscot' }, '04240': { city: 'Lewiston', county: 'Androscoggin' },
    '04005': { city: 'Bar Harbor', county: 'Hancock' },
  },
  'MD': {
    '21201': { city: 'Baltimore', county: 'Baltimore City' }, '21202': { city: 'Baltimore', county: 'Baltimore City' },
    '21401': { city: 'Annapolis', county: 'Anne Arundel' }, '20850': { city: 'Rockville', county: 'Montgomery' },
    '20742': { city: 'Temple Hills', county: "Prince George's" }, '21044': { city: 'Columbia', county: 'Howard' },
  },
  'MA': {
    '02108': { city: 'Boston', county: 'Suffolk' }, '01608': { city: 'Worcester', county: 'Worcester' },
    '01103': { city: 'Springfield', county: 'Hampden' }, '02138': { city: 'Cambridge', county: 'Middlesex' },
    '01852': { city: 'Lowell', county: 'Middlesex' },
  },
  'MI': {
    '48226': { city: 'Detroit', county: 'Wayne' }, '49503': { city: 'Grand Rapids', county: 'Kent' },
    '48933': { city: 'Lansing', county: 'Ingham' }, '48104': { city: 'Ann Arbor', county: 'Washtenaw' },
    '48502': { city: 'Flint', county: 'Genesee' },
  },
  'MN': {
    '55401': { city: 'Minneapolis', county: 'Hennepin' }, '55101': { city: 'Saint Paul', county: 'Ramsey' },
    '55901': { city: 'Rochester', county: 'Olmsted' }, '55802': { city: 'Duluth', county: 'St. Louis' },
    '56301': { city: 'St. Cloud', county: 'Stearns' },
  },
  'MS': {
    '39201': { city: 'Jackson', county: 'Hinds' }, '39501': { city: 'Gulfport', county: 'Harrison' },
    '38655': { city: 'Oxford', county: 'Lafayette' }, '39759': { city: 'Starkville', county: 'Oktibbeha' },
    '39401': { city: 'Hattiesburg', county: 'Forrest' },
  },
  'MO': {
    '64105': { city: 'Kansas City', county: 'Jackson' }, '63101': { city: 'St. Louis', county: 'St. Louis City' },
    '65802': { city: 'Springfield', county: 'Greene' }, '65201': { city: 'Columbia', county: 'Boone' },
    '65101': { city: 'Jefferson City', county: 'Cole' },
  },
  'MT': {
    '59101': { city: 'Billings', county: 'Yellowstone' }, '59801': { city: 'Missoula', county: 'Missoula' },
    '59715': { city: 'Bozeman', county: 'Gallatin' }, '59601': { city: 'Helena', county: 'Lewis and Clark' },
    '59401': { city: 'Great Falls', county: 'Cascade' },
  },
  'NE': {
    '68102': { city: 'Omaha', county: 'Douglas' }, '68508': { city: 'Lincoln', county: 'Lancaster' },
    '68801': { city: 'Grand Island', county: 'Hall' }, '69101': { city: 'North Platte', county: 'Lincoln' },
    '69361': { city: 'Scottsbluff', county: 'Scotts Bluff' },
  },
  'NV': {
    '89101': { city: 'Las Vegas', county: 'Clark' }, '89501': { city: 'Reno', county: 'Washoe' },
    '89451': { city: 'Incline Village', county: 'Washoe' }, '89701': { city: 'Carson City', county: 'Carson City' },
    '89011': { city: 'Henderson', county: 'Clark' },
  },
  'NH': {
    '03101': { city: 'Manchester', county: 'Hillsborough' }, '03301': { city: 'Concord', county: 'Merrimack' },
    '03060': { city: 'Nashua', county: 'Hillsborough' }, '03801': { city: 'Portsmouth', county: 'Rockingham' },
    '03755': { city: 'Hanover', county: 'Grafton' },
  },
  'NJ': {
    '07302': { city: 'Jersey City', county: 'Hudson' }, '07306': { city: 'Jersey City', county: 'Hudson' },
    '07102': { city: 'Newark', county: 'Essex' }, '07501': { city: 'Paterson', county: 'Passaic' },
    '07201': { city: 'Elizabeth', county: 'Union' }, '08817': { city: 'Edison', county: 'Middlesex' },
    '08002': { city: 'Cherry Hill', county: 'Camden' }, '08608': { city: 'Trenton', county: 'Mercer' },
  },
  'NM': {
    '87102': { city: 'Albuquerque', county: 'Bernalillo' }, '87501': { city: 'Santa Fe', county: 'Santa Fe' },
    '88001': { city: 'Las Cruces', county: 'Dona Ana' }, '87571': { city: 'Taos', county: 'Taos' },
    '88201': { city: 'Roswell', county: 'Chaves' },
  },
  'NY': {
    '10001': { city: 'New York', county: 'New York' }, '10002': { city: 'New York', county: 'New York' },
    '11201': { city: 'Brooklyn', county: 'Kings' }, '11206': { city: 'Brooklyn', county: 'Kings' },
    '14201': { city: 'Buffalo', county: 'Erie' }, '14202': { city: 'Buffalo', county: 'Erie' },
    '14604': { city: 'Rochester', county: 'Monroe' }, '13202': { city: 'Syracuse', county: 'Onondaga' },
    '12203': { city: 'Albany', county: 'Albany' }, '10451': { city: 'Bronx', county: 'Bronx' },
    '11432': { city: 'Jamaica', county: 'Queens' }, '10301': { city: 'Staten Island', county: 'Richmond' }
  },
  'NC': {
    '28202': { city: 'Charlotte', county: 'Mecklenburg' }, '27601': { city: 'Raleigh', county: 'Wake' },
    '27401': { city: 'Greensboro', county: 'Guilford' }, '27701': { city: 'Durham', county: 'Durham' },
    '28801': { city: 'Asheville', county: 'Buncombe' },
  },
  'ND': {
    '58102': { city: 'Fargo', county: 'Cass' }, '58501': { city: 'Bismarck', county: 'Burleigh' },
    '58201': { city: 'Grand Forks', county: 'Grand Forks' }, '58701': { city: 'Minot', county: 'Ward' },
    '58801': { city: 'Williston', county: 'Williams' },
  },
  'OH': {
    '43215': { city: 'Columbus', county: 'Franklin' }, '44113': { city: 'Cleveland', county: 'Cuyahoga' },
    '45202': { city: 'Cincinnati', county: 'Hamilton' }, '45402': { city: 'Dayton', county: 'Montgomery' },
    '44308': { city: 'Akron', county: 'Summit' },
  },
  'OK': {
    '73102': { city: 'Oklahoma City', county: 'Oklahoma' }, '74103': { city: 'Tulsa', county: 'Tulsa' },
    '73069': { city: 'Norman', county: 'Cleveland' }, '74012': { city: 'Broken Arrow', county: 'Tulsa' },
    '73501': { city: 'Lawton', county: 'Comanche' },
  },
  'OR': {
    '97201': { city: 'Portland', county: 'Multnomah' }, '97202': { city: 'Portland', county: 'Multnomah' },
    '97301': { city: 'Salem', county: 'Marion' }, '97401': { city: 'Eugene', county: 'Lane' },
    '97701': { city: 'Bend', county: 'Deschutes' }, '97005': { city: 'Beaverton', county: 'Washington' },
  },
  'PA': {
    '19102': { city: 'Philadelphia', county: 'Philadelphia' }, '15219': { city: 'Pittsburgh', county: 'Allegheny' },
    '18101': { city: 'Allentown', county: 'Lehigh' }, '16501': { city: 'Erie', county: 'Erie' },
    '17101': { city: 'Harrisburg', county: 'Dauphin' },
  },
  'RI': {
    '02903': { city: 'Providence', county: 'Providence' }, '02886': { city: 'Warwick', county: 'Kent' },
    '02822': { city: 'Cranston', county: 'Providence' }, '02860': { city: 'Pawtucket', county: 'Providence' },
    '02895': { city: 'Woonsocket', county: 'Providence' },
  },
  'SC': {
    '29201': { city: 'Columbia', county: 'Richland' }, '29401': { city: 'Charleston', county: 'Charleston' },
    '29601': { city: 'Greenville', county: 'Greenville' }, '29577': { city: 'Myrtle Beach', county: 'Horry' },
    '29730': { city: 'Rock Hill', county: 'York' },
  },
  'SD': {
    '57102': { city: 'Sioux Falls', county: 'Minnehaha' }, '57701': { city: 'Rapid City', county: 'Pennington' },
    '57401': { city: 'Aberdeen', county: 'Brown' }, '57006': { city: 'Brookings', county: 'Brookings' },
    '57201': { city: 'Watertown', county: 'Codington' },
  },
  'TN': {
    '37201': { city: 'Nashville', county: 'Davidson' }, '38103': { city: 'Memphis', county: 'Shelby' },
    '37902': { city: 'Knoxville', county: 'Knox' }, '37402': { city: 'Chattanooga', county: 'Hamilton' },
    '37040': { city: 'Clarksville', county: 'Montgomery' },
  },
  'TX': {
    '77002': { city: 'Houston', county: 'Harris' }, '78205': { city: 'San Antonio', county: 'Bexar' },
    '75201': { city: 'Dallas', county: 'Dallas' }, '78701': { city: 'Austin', county: 'Travis' },
    '76102': { city: 'Fort Worth', county: 'Tarrant' },
  },
  'UT': {
    '84101': { city: 'Salt Lake City', county: 'Salt Lake' }, '84601': { city: 'Provo', county: 'Utah' },
    '84060': { city: 'Park City', county: 'Summit' }, '84401': { city: 'Ogden', county: 'Weber' },
    '84770': { city: 'St. George', county: 'Washington' },
  },
  'VT': {
    '05401': { city: 'Burlington', county: 'Chittenden' }, '05602': { city: 'Montpelier', county: 'Washington' },
    '05701': { city: 'Rutland', county: 'Rutland' }, '05403': { city: 'South Burlington', county: 'Chittenden' },
    '05001': { city: 'White River Junction', county: 'Windsor' },
  },
  'VA': {
    '23219': { city: 'Richmond', county: 'Richmond City' }, '23451': { city: 'Virginia Beach', county: 'Virginia Beach City' },
    '22201': { city: 'Arlington', county: 'Arlington' }, '22314': { city: 'Alexandria', county: 'Alexandria City' },
    '23510': { city: 'Norfolk', county: 'Norfolk City' },
  },
  'WA': {
    '98101': { city: 'Seattle', county: 'King' }, '99201': { city: 'Spokane', county: 'Spokane' },
    '98402': { city: 'Tacoma', county: 'Pierce' }, '98004': { city: 'Bellevue', county: 'King' },
    '98501': { city: 'Olympia', county: 'Thurston' },
  },
  'WV': {
    '25301': { city: 'Charleston', county: 'Kanawha' }, '26505': { city: 'Morgantown', county: 'Monongalia' },
    '25701': { city: 'Huntington', county: 'Cabell' }, '26003': { city: 'Wheeling', county: 'Ohio' },
    '26301': { city: 'Clarksburg', county: 'Harrison' },
  },
  'WI': {
    '53202': { city: 'Milwaukee', county: 'Milwaukee' }, '53703': { city: 'Madison', county: 'Dane' },
    '54301': { city: 'Green Bay', county: 'Brown' }, '53140': { city: 'Kenosha', county: 'Kenosha' },
    '54911': { city: 'Appleton', county: 'Outagamie' },
  },
  'WY': {
    '82001': { city: 'Cheyenne', county: 'Laramie' }, '82601': { city: 'Casper', county: 'Natrona' },
    '82070': { city: 'Laramie', county: 'Albany' }, '82801': { city: 'Sheridan', county: 'Sheridan' },
    '83001': { city: 'Jackson', county: 'Teton' },
  }
};

export const getCityAndCountyByZip = (state: string, zip: string): { city: string, county: string } | undefined => {
  return zipCodeCityCountyData[state]?.[zip];
};

export const getCityByZip = (state: string, zip: string): string | undefined => {
  return zipCodeCityCountyData[state]?.[zip]?.city;
};

export const getZipsByState = (state: string): string[] => {
    return zipCodeCityCountyData[state] ? Object.keys(zipCodeCityCountyData[state]).sort() : [];
}

export const getRequiredForms = (employee: Partial<Employee>): (keyof Employee['taxForms'])[] => {
    if (!employee.employeeType || !employee.stateOfResidence) return [];

    if (employee.employeeType === '1099') {
        return ['federalW9'];
    }
    
    const forms: (keyof Employee['taxForms'])[] = ['i9Form', 'federalW4'];
    switch (employee.stateOfResidence) {
        case 'AL': forms.push('al_A4'); break;
        case 'AK': forms.push('ak_Acknowledgement'); break;
        case 'AZ': forms.push('az_A4'); break;
        case 'AR': forms.push('ar_AR4EC'); break;
        case 'CA': forms.push('ca_DE4'); break;
        case 'CO': forms.push('co_DR0004'); break;
        case 'CT': forms.push('ct_W4'); break;
        case 'DE': forms.push('de_W4'); break;
        case 'DC': forms.push('dc_W4'); break;
        case 'FL': forms.push('fl_Acknowledgement'); break;
        case 'GA': forms.push('ga_G4'); break;
        case 'HI': forms.push('hi_HW4'); break;
        case 'ID': forms.push('id_W4'); break;
        case 'IL': forms.push('il_W4'); break;
        case 'IN': forms.push('in_WH4'); break;
        case 'IA': forms.push('ia_W4'); break;
        case 'KS': forms.push('ks_K4'); break;
        case 'KY': forms.push('ky_K4'); break;
        case 'LA': forms.push('la_L4'); break;
        case 'ME': forms.push('me_W4'); break;
        case 'MD': forms.push('md_MW507'); break;
        case 'MA': forms.push('ma_M4'); break;
        case 'MI': forms.push('mi_W4'); break;
        case 'MN': forms.push('mn_W4MN'); break;
        case 'MS': forms.push('ms_89350'); break;
        case 'MO': forms.push('mo_W4'); break;
        case 'MT': forms.push('mt_MW4'); break;
        case 'NE': forms.push('ne_W4N'); break;
        case 'NV': forms.push('nv_Acknowledgement'); break;
        case 'NH': forms.push('nh_Acknowledgement'); break;
        case 'NJ': forms.push('nj_W4'); break;
        case 'NM': forms.push('nm_Acknowledgement'); break;
        case 'NY': forms.push('ny_IT2104'); break;
        case 'NC': forms.push('nc_W4'); break;
        case 'ND': forms.push('nd_W4'); break;
        case 'OH': forms.push('oh_IT4'); break;
        case 'OK': forms.push('ok_W4'); break;
        case 'OR': forms.push('or_W4'); break;
        case 'PA': forms.push('pa_W4'); break;
        case 'RI': forms.push('ri_W4'); break;
        case 'SC': forms.push('sc_W4'); break;
        case 'SD': forms.push('sd_Acknowledgement'); break;
        case 'TN': forms.push('tn_Acknowledgement'); break;
        case 'TX': forms.push('tx_Acknowledgement'); break;
        case 'UT': forms.push('ut_Acknowledgement'); break;
        case 'VT': forms.push('vt_W4'); break;
        case 'VA': forms.push('va_W4'); break;
        case 'WA': forms.push('wa_Acknowledgement'); break;
        case 'WV': forms.push('wv_IT104'); break;
        case 'WI': forms.push('wi_WT4'); break;
        case 'WY': forms.push('wy_Acknowledgement'); break;
    }
    return forms;
};

export const getIncompleteForms = (employee: Employee): (keyof Employee['taxForms'])[] => {
    const requiredForms = getRequiredForms(employee);
    return requiredForms.filter(formKey => {
        const submissions = employee.taxForms[formKey];
        return !Array.isArray(submissions) || submissions.length === 0;
    });
};