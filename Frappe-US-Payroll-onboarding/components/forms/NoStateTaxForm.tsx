
import React, { useState, useEffect } from 'react';
import { Acknowledgement_FormData } from '../../types';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';

interface Props {
  data: Acknowledgement_FormData;
  stateName: string;
  usesFederalW4?: boolean;
  onChange?: (data: Acknowledgement_FormData) => void;
  onSave?: (data: Acknowledgement_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof Acknowledgement_FormData, string>>;
}

const NoStateTaxForm: React.FC<Props> = ({ data, stateName, usesFederalW4 = false, onChange, onSave, isSaving, errors }) => {
  const [formData, setFormData] = useState<Acknowledgement_FormData>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const updateState = (updatedData: Acknowledgement_FormData) => {
    setFormData(updatedData);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateState({ ...formData, hasAcknowledged: e.target.checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const title = usesFederalW4 
    ? `${stateName} State Tax Information`
    : `${stateName} Withholding Acknowledgement`;
  
  const description = usesFederalW4
    ? `${stateName} uses the federal Form W-4 for state withholding purposes. No separate state form is required.`
    : `${stateName} does not have a state income tax. No state withholding form is required.`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">For Tax Year: {data.formYear}</p>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        <div className="pt-8">
          <div className="mt-6">
              <Checkbox 
                id="hasAcknowledged" 
                name="hasAcknowledged" 
                label={`I acknowledge that I have read the above information for ${stateName}.`}
                checked={formData.hasAcknowledged} 
                onChange={handleChange}
                error={errors?.hasAcknowledged}
              />
          </div>
        </div>
      </div>
      {onSave && (
        <div className="pt-8 flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Submitting...' : 'Submit New Version'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default NoStateTaxForm;
