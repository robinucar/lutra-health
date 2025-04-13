import type { InferSelectModel } from 'drizzle-orm';
import { patients } from '../../../../server/db/schema';
import type { JSX } from 'react';

type Patient = InferSelectModel<typeof patients>;

type PatientInfoProps = {
	/**
	 * The patient object containing personal information.
	 */
	patient: Patient;

	/**
	 * The patient's formatted date of birth (e.g., '12/06/1985').
	 */
	formattedDate: string;
};

/**
 * Displays a patient's basic information: full name, email, and date of birth.
 *
 * @component
 * @param {PatientInfoProps} props - Props including patient data and formatted date
 * @returns {JSX.Element} A section of the modal showing patient info
 */
const PatientInfo = ({ patient, formattedDate }: PatientInfoProps): JSX.Element => {
	return (
		<>
			<h2 id="patient-modal-title" className="text-xl font-bold mb-2">
				{patient.firstName} {patient.lastName}
			</h2>
			<p className="text-sm text-gray-700 mb-2">
				<strong>Email:</strong> {patient.email ?? 'N/A'}
			</p>
			<p className="text-sm text-gray-700 mb-4">
				<strong>Date of Birth:</strong> {formattedDate}
			</p>
		</>
	);
};

export default PatientInfo;
