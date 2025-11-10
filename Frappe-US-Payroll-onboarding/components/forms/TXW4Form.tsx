
import React from 'react';
import { Acknowledgement_FormData } from '../../types';
import NoStateTaxForm from './NoStateTaxForm';

interface Props {
  data: Acknowledgement_FormData;
  onChange?: (data: Acknowledgement_FormData) => void;
  onSave?: (data: Acknowledgement_FormData) => void;
  isSaving?: boolean;
  errors?: Partial<Record<keyof Acknowledgement_FormData, string>>;
}

const TXW4Form: React.FC<Props> = (props) => {
  return <NoStateTaxForm {...props} stateName="Texas" />;
};

export default TXW4Form;
