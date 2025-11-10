import React from 'react';
import { FormSubmission } from '../types';

interface Props {
  submissions: FormSubmission<any>[];
}

const SubmissionHistory: React.FC<Props> = ({ submissions }) => {
  if (!submissions || submissions.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Submission History</h3>
      <div className="border border-frappe-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-frappe-gray-200">
          <thead className="bg-frappe-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">Submission Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-frappe-gray-500 uppercase tracking-wider">Form Version / Year</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-frappe-gray-200">
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{submission.submissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{submission.formData.formYear || submission.formData.formVersion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionHistory;
