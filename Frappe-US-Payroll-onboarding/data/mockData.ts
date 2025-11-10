import { Employee, FilingStatus, NYFilingStatus, NJFilingStatus, CitizenshipStatus, FederalTaxClassification, CAFilingStatus } from '../types';

const currentYear = new Date().getFullYear();

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Eleanor Vance',
    title: 'Software Engineer',
    email: 'eleanor.v@example.com',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    stateOfResidence: 'NY',
    employeeType: 'W2',
    taxForms: {
      i9Form: [{
        submissionDate: `${currentYear}-01-10`,
        formData: {
          formVersion: 'Rev. 10/21/2019',
          lastName: 'Vance',
          firstName: 'Eleanor',
          middleInitial: 'J',
          address: '123 Main St',
          city: 'Brooklyn',
          state: 'NY',
          zipCode: '11201',
          dateOfBirth: '1990-05-15',
          socialSecurityNumber: '***-**-1234',
          citizenshipStatus: CitizenshipStatus.US_CITIZEN,
          listADocument: {
            title: 'U.S. Passport',
            issuingAuthority: 'U.S. Department of State',
            documentNumber: 'X12345678',
            expirationDate: '2028-10-22',
          },
        }
      }],
      federalW4: [
        {
          submissionDate: `${currentYear}-01-10`,
          formData: {
            formYear: currentYear,
            filingStatus: FilingStatus.SINGLE,
            multipleJobs: false,
            qualifyingChildrenAmount: 0,
            otherDependentsAmount: 0,
            otherIncome: 0,
            deductions: 0,
            extraWithholding: 0,
          }
        },
        {
          submissionDate: `${currentYear - 1}-03-05`,
          formData: {
            formYear: currentYear - 1,
            filingStatus: FilingStatus.SINGLE,
            multipleJobs: false,
            qualifyingChildrenAmount: 0,
            otherDependentsAmount: 0,
            otherIncome: 0,
            deductions: 0,
            extraWithholding: 0,
          }
        }
      ],
      ny_IT2104: [{
        submissionDate: `${currentYear}-01-10`,
        formData: {
          formYear: currentYear,
          filingStatus: NYFilingStatus.SINGLE,
          totalAllowances: 1,
          isNYCResident: true,
          nycAllowances: 1,
          isYonkersResident: false,
          yonkersAllowances: 0,
          additionalWithholding: 0,
        }
      }]
    }
  },
  {
    id: 2,
    name: 'Marcus Holloway',
    title: 'Product Manager',
    email: 'marcus.h@example.com',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    stateOfResidence: 'NJ',
    employeeType: 'W2',
    taxForms: {
      i9Form: [{
        submissionDate: `${currentYear}-02-20`,
        formData: {
          formVersion: 'Rev. 10/21/2019',
          lastName: 'Holloway',
          firstName: 'Marcus',
          middleInitial: '',
          address: '456 Market St',
          city: 'Jersey City',
          state: 'NJ',
          zipCode: '07302',
          dateOfBirth: '1985-11-20',
          socialSecurityNumber: '***-**-5678',
          citizenshipStatus: CitizenshipStatus.LAWFUL_PERMANENT_RESIDENT,
          uscisNumber: 'A987654321',
          listADocument: {
            title: 'Permanent Resident Card (Form I-551)',
            issuingAuthority: 'USCIS',
            documentNumber: 'SRC-22-123-45678',
            expirationDate: '2030-01-15'
          },
        }
      }],
      federalW4: [{
        submissionDate: `${currentYear}-02-20`,
        formData: {
          formYear: currentYear,
          filingStatus: FilingStatus.MARRIED_JOINTLY,
          multipleJobs: true,
          qualifyingChildrenAmount: 4000,
          otherDependentsAmount: 500,
          otherIncome: 10000,
          deductions: 0,
          extraWithholding: 50,
        }
      }],
      nj_W4: [] // Incomplete onboarding
    }
  },
  {
    id: 3,
    name: 'Chloe Price',
    title: 'UX Designer',
    email: 'chloe.p@example.com',
    avatarUrl: 'https://picsum.photos/id/1011/200/200',
    stateOfResidence: 'FL',
    employeeType: 'W2',
    taxForms: {
      i9Form: [{
        submissionDate: `${currentYear-1}-12-15`,
        formData: {
          formVersion: 'Rev. 10/21/2019',
          lastName: 'Price',
          firstName: 'Chloe',
          middleInitial: 'E',
          address: '789 Ocean Drive',
          city: 'Miami',
          state: 'FL',
          zipCode: '33139',
          dateOfBirth: '1995-03-10',
          socialSecurityNumber: '***-**-9876',
          citizenshipStatus: CitizenshipStatus.US_CITIZEN,
          listBDocument: {
              title: 'State Driver\'s License',
              issuingAuthority: 'Florida HSMV',
              documentNumber: 'P123-456-78-901-0',
              expirationDate: '2027-03-10',
          },
          listCDocument: {
              title: 'Social Security Card',
              issuingAuthority: 'Social Security Administration',
              documentNumber: '***-**-9876',
          },
        }
      }],
      federalW4: [{
        submissionDate: `${currentYear-1}-12-15`,
        formData: {
          formYear: currentYear,
          filingStatus: FilingStatus.HEAD_OF_HOUSEHOLD,
          multipleJobs: false,
          qualifyingChildrenAmount: 2000,
          otherDependentsAmount: 0,
          otherIncome: 0,
          deductions: 2900,
          extraWithholding: 0,
        }
      }],
      fl_Acknowledgement: [{
        submissionDate: `${currentYear-1}-12-15`,
        formData: {
          formYear: currentYear,
          hasAcknowledged: true,
        }
      }]
    }
  },
  {
    id: 4,
    name: 'David Chen',
    title: 'Consultant',
    email: 'david.c@example.com',
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    stateOfResidence: 'TX',
    employeeType: '1099',
    taxForms: {
      federalW9: [] // Incomplete onboarding
    }
  },
  {
    id: 5,
    name: 'Aiden Pearce',
    title: 'Security Specialist',
    email: 'aiden.p@example.com',
    avatarUrl: 'https://picsum.photos/id/1013/200/200',
    stateOfResidence: 'CA',
    employeeType: 'W2',
    taxForms: {
      i9Form: [{
        submissionDate: `${currentYear}-03-01`,
        formData: {
          formVersion: 'Rev. 10/21/2019',
          lastName: 'Pearce',
          firstName: 'Aiden',
          middleInitial: 'K',
          address: '101 Hacker Way',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          dateOfBirth: '1988-02-28',
          socialSecurityNumber: '***-**-4321',
          citizenshipStatus: CitizenshipStatus.US_CITIZEN,
          listADocument: {
            title: 'U.S. Passport',
            issuingAuthority: 'U.S. Department of State',
            documentNumber: 'Y98765432',
            expirationDate: '2031-07-11',
          },
        }
      }],
      federalW4: [{
        submissionDate: `${currentYear}-03-01`,
        formData: {
          formYear: currentYear,
          filingStatus: FilingStatus.SINGLE,
          multipleJobs: false,
          qualifyingChildrenAmount: 0,
          otherDependentsAmount: 0,
          otherIncome: 5000,
          deductions: 0,
          extraWithholding: 25,
        }
      }],
      ca_DE4: [] // Incomplete onboarding
    }
  },
  {
    id: 6,
    name: 'Sarah Miller',
    title: 'Data Analyst',
    email: 'sarah.m@example.com',
    avatarUrl: 'https://picsum.photos/id/1014/200/200',
    stateOfResidence: 'IN',
    employeeType: 'W2',
    taxForms: {
      i9Form: [], // Incomplete onboarding
      federalW4: [], // Incomplete onboarding
      in_WH4: [] // Incomplete onboarding
    }
  },
  {
    id: 7,
    name: 'Max Caulfield',
    title: 'Photographer',
    email: 'max.c@example.com',
    avatarUrl: 'https://picsum.photos/id/1015/200/200',
    stateOfResidence: 'OR',
    employeeType: 'W2',
    taxForms: {
      i9Form: [],
      federalW4: [],
      or_W4: [] // Incomplete onboarding
    }
  },
  {
    id: 8,
    name: 'Jolene Miller',
    title: 'Project Coordinator',
    email: 'jolene.m@example.com',
    avatarUrl: 'https://picsum.photos/id/1016/200/200',
    stateOfResidence: 'IL',
    employeeType: 'W2',
    taxForms: {
      i9Form: [],
      federalW4: [],
      il_W4: [] // Incomplete onboarding
    }
  },
  {
    id: 9,
    name: 'Arthur Morgan',
    title: 'Account Executive',
    email: 'arthur.m@example.com',
    avatarUrl: 'https://picsum.photos/id/1025/200/200',
    stateOfResidence: 'AL',
    employeeType: 'W2',
    taxForms: {
      i9Form: [],
      federalW4: [],
      al_A4: []
    }
  },
  {
    id: 10,
    name: 'Jesse Faden',
    title: 'Director of Operations',
    email: 'jesse.f@example.com',
    avatarUrl: 'https://picsum.photos/id/1026/200/200',
    stateOfResidence: 'AZ',
    employeeType: 'W2',
    taxForms: {
      i9Form: [],
      federalW4: [],
      az_A4: []
    }
  },
  {
    id: 11,
    name: 'Leon Kennedy',
    title: 'Compliance Officer',
    email: 'leon.k@example.com',
    avatarUrl: 'https://picsum.photos/id/1028/200/200',
    stateOfResidence: 'CO',
    employeeType: 'W2',
    taxForms: {
      i9Form: [],
      federalW4: [],
      co_DR0004: []
    }
  }
];
