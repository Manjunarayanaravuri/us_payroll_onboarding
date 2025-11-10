import React, { useState, useEffect } from 'react';
import { Employee, USState, EmployeeType } from '../types';
import Modal from './ui/Modal';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { usStates } from '../utils/validation';

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onSave: (updatedData: Partial<Employee>) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ isOpen, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    stateOfResidence: 'NY' as USState,
    employeeType: 'W2' as EmployeeType,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        title: employee.title || '',
        email: employee.email || '',
        stateOfResidence: employee.stateOfResidence,
        employeeType: employee.employeeType,
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            id="title"
            name="title"
            label="Title / Role"
            value={formData.title}
            onChange={handleChange}
          />
           <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <Select
            id="employeeType"
            name="employeeType"
            label="Classification"
            value={formData.employeeType}
            onChange={handleChange}
          >
            <option value="W2">W-2 Employee</option>
            <option value="1099">1099 Contractor</option>
          </Select>
          <Select
            id="stateOfResidence"
            name="stateOfResidence"
            label="State of Residence"
            value={formData.stateOfResidence}
            onChange={handleChange}
          >
            {usStates.map(state => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEmployeeModal;