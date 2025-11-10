import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeProfiles } from '../contexts/EmployeeProfileContext';
import { Employee, EmployeeType, USState } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import { ChevronRightIcon, PlusIcon } from '../components/icons/Icon';
import { usStates, getRequiredForms } from '../utils/validation';
import { useToast } from "../contexts/ToastContext";

const getOnboardingProgress = (employee: Employee): { isComplete: boolean; progressText: string } => {
    const requiredForms = getRequiredForms(employee);
    const completedFormsCount = requiredForms.filter(formKey => {
        const submissions = employee.taxForms[formKey];
        return Array.isArray(submissions) && submissions.length > 0;
    }).length;

    const totalForms = requiredForms.length;
    const isComplete = totalForms > 0 && completedFormsCount === totalForms;
    const progressText = isComplete ? 'Complete' : `${completedFormsCount} of ${totalForms} forms complete`;
    return { isComplete, progressText };
};

const stateMap: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};


const EmployeeRow: React.FC<{ employee: Employee; onClick: () => void }> = ({ employee, onClick }) => {
  const { isComplete, progressText } = getOnboardingProgress(employee);

  return (
    <tr onClick={onClick} className="hover:bg-frappe-gray-50 cursor-pointer border-b border-frappe-gray-200">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={employee.avatarUrl} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-frappe-gray-900">{employee.name}</div>
            <div className="text-sm text-frappe-gray-500">{employee.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-frappe-gray-500">
        <div>{employee.title}</div>
        <div className="text-xs text-frappe-gray-400">{employee.employeeType === 'W2' ? 'W-2 Employee' : '1099 Contractor'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-frappe-gray-500">
        {employee.stateOfResidence}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          isComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isComplete ? 'Complete' : 'Pending'}
        </span>
         {!isComplete && <div className="text-xs text-frappe-gray-500 mt-1">{progressText}</div>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ChevronRightIcon className="w-5 h-5 text-frappe-gray-400" />
      </td>
    </tr>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { employees, addEmployee } = useEmployeeProfiles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newState, setNewState] = useState<USState>('NY');
  const [newEmployeeType, setNewEmployeeType] = useState<EmployeeType>('W2');
  const { addToast } = useToast();
  
  const handleEmployeeClick = (employee: Employee) => {
      if (getOnboardingProgress(employee).isComplete) {
          navigate(`/employee/${employee.id}`);
      } else {
          navigate(`/employee/${employee.id}/onboard`);
      }
  }
  
  const handleCreateEmployee = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newEmployeeName.trim()) {
    addToast("Employee name cannot be empty.", "error");
    return;
  }

  const stateFullName = stateMap[newState];
  const classificationValue =
    newEmployeeType === "W2" ? "Employee (W-2)" : "Contractor (1099)";

  try {
    const res = await fetch("/api/method/us_payroll_onboarding.api.employee.create_employee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: newEmployeeName,
        classification: classificationValue,
        state: stateFullName,
      }),
      credentials: "omit",
    });

    const result = await res.json();
    const erpEmployeeName = result?.name || result?.message?.name;

    if (!erpEmployeeName) {
      addToast("Could not get ERPNext employee ID from server response.", "error");
      return;
    }

    const newEmployee = await addEmployee(
      newEmployeeName,
      newState,
      newEmployeeType,
      erpEmployeeName
    );

    setIsModalOpen(false);
    setNewEmployeeName("");
    setNewState("NY");
    setNewEmployeeType("W2");

    addToast(`${newEmployeeName} created successfully! in ERPNext`, "success");

    navigate(`/employee/${newEmployee.id}/onboard`, {
      state: { erpEmployeeName },
    });
  } catch (error) {
    console.error(error);
    addToast("Failed to create employee in ERPNext.", "error");
  }
};




  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-frappe-gray-900">Employee & Contractor Tax Forms</h1>
        <Button onClick={() => setIsModalOpen(true)} className="inline-flex items-center">
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
            Add New Person
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-frappe-gray-200">
            <thead className="bg-frappe-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">
                  Title / Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-frappe-gray-200">
              {employees.map((employee) => (
                <EmployeeRow key={employee.id} employee={employee} onClick={() => handleEmployeeClick(employee)} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Person">
            <form onSubmit={handleCreateEmployee}>
                <div className="space-y-4">
                    <Input 
                        id="employeeName"
                        label="Full Name"
                        value={newEmployeeName}
                        onChange={(e) => setNewEmployeeName(e.target.value)}
                        placeholder="e.g., Jane Doe"
                        required
                    />
                    <Select
                        id="employeeType"
                        label="Classification"
                        value={newEmployeeType}
                        onChange={(e) => setNewEmployeeType(e.target.value as EmployeeType)}
                    >
                        <option value="W2">W-2 Employee</option>
                        <option value="1099">1099 Contractor</option>
                    </Select>
                    <Select
                        id="employeeState"
                        label="State of Residence"
                        value={newState}
                        onChange={(e) => setNewState(e.target.value as USState)}
                    >
                        {usStates.map(state => (
                           <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button type="submit">Create & Onboard</Button>
                </div>
            </form>
      </Modal>
    </div>
  );
};

export default Dashboard;