import type { InferSelectModel } from 'drizzle-orm';
import { patients } from '../../../../server/db/schema';

type Patient = InferSelectModel<typeof patients>;

type PatientInfoProps = {
	patient: Patient;
	formattedDate: string;
};

const PatientInfo = ({ patient, formattedDate }: PatientInfoProps) => {
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
