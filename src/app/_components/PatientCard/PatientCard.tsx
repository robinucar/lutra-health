'use client';

import type { InferSelectModel } from 'drizzle-orm';
import { patients } from '../../../server/db/schema';

type Patient = InferSelectModel<typeof patients>;

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void; // ✅ make click handler optional
}

const PatientCard = ({ patient, onClick }: PatientCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative rounded border border-gray-200 bg-white p-2 cursor-pointer hover:shadow-md transition"
    >
      <div className="h-20">
        <div className="relative h-full overflow-hidden rounded bg-gray-50" />
      </div>
      <h3 className="mt-2 font-semibold">
        <span className="group-hover:text-blue-600">
          {patient.firstName} {patient.lastName}
        </span>
      </h3>
      <p className="text-gray-600 text-sm">{patient.email ?? 'No email'}</p>
    </div>
  );
};

export default PatientCard;
