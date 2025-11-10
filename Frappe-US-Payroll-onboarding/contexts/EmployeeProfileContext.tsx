import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Employee, EmployeeType, USState } from '../types';
import { mockEmployees } from '../data/mockData';
import { getRequiredForms } from '../utils/validation';

interface EmployeeProfileContextType {
  employees: Employee[];
  updateEmployee: (employeeId: number, updatedData: Partial<Employee>) => Promise<void>;
  addEmployee: (name: string, state: USState, type: EmployeeType, erpEmployeeName?: string) => Promise<Employee>;
}

const EmployeeProfileContext = createContext<EmployeeProfileContextType | undefined>(undefined);

export const useEmployeeProfiles = () => {
  const context = useContext(EmployeeProfileContext);
  if (!context) {
    throw new Error('useEmployeeProfiles must be used within an EmployeeProfileProvider');
  }
  return context;
};

export const EmployeeProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const updateEmployee = (employeeId: number, updatedData: Partial<Employee>): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setEmployees(prevEmployees => {
            const cleanPrevEmployees = prevEmployees.filter(emp => emp != null);
            const employeeIndex = cleanPrevEmployees.findIndex(emp => emp.id === employeeId);
            if (employeeIndex === -1) {
                reject(new Error("Employee not found"));
                return cleanPrevEmployees;
            }

            const existingEmployee = cleanPrevEmployees[employeeIndex];
            const newEmployeeData = { ...existingEmployee, ...updatedData };
            
            const oldForms = getRequiredForms(existingEmployee);
            const newForms = getRequiredForms(newEmployeeData);

            // If forms change, ensure new forms are initialized without losing old data
            if (JSON.stringify(oldForms.sort()) !== JSON.stringify(newForms.sort())) {
                const newTaxForms = { ...newEmployeeData.taxForms };
                newForms.forEach(formKey => {
                    if (!(formKey in newTaxForms)) {
                        (newTaxForms as any)[formKey] = [];
                    }
                });
                newEmployeeData.taxForms = newTaxForms;
            }
            
            const updatedEmployees = [...cleanPrevEmployees];
            updatedEmployees[employeeIndex] = newEmployeeData;
            return updatedEmployees;
        });
        resolve();
      }, 500); // Simulating network delay
    });
  };
  
  const addEmployee = (
  name: string,
  state: USState,
  type: EmployeeType,
  erpEmployeeName?: string   // ✅ added optional parameter
): Promise<Employee> => {
  return new Promise((resolve) => {
    setEmployees(prevEmployees => {
      const cleanPrevEmployees = prevEmployees.filter(emp => emp != null);
      const newId = Math.max(...cleanPrevEmployees.map(e => e.id), 0) + 1;
      
      const newEmployee: Employee = {
        id: newId,
        name,
        stateOfResidence: state,
        employeeType: type,
        title: 'Awaiting Onboarding',
        email: `${name.toLowerCase().replace(/\s/g, '.')}@example.com`,
        avatarUrl: `https://picsum.photos/seed/${newId}/200/200`,
        taxForms: {},
        erpEmployeeName: erpEmployeeName || "",   // ✅ added new field
      };
      
      const requiredForms = getRequiredForms(newEmployee);
      requiredForms.forEach(formKey => {
        (newEmployee.taxForms as any)[formKey] = [];
      });

      const updatedEmployees = [...cleanPrevEmployees, newEmployee];
      resolve(newEmployee);
      return updatedEmployees;
    });
  });
};


  const value = { employees, updateEmployee, addEmployee };

  return (
    <EmployeeProfileContext.Provider value={value}>
      {children}
    </EmployeeProfileContext.Provider>
  );
};