'use client';

import { api } from '@lutra/trpc/react';
import PatientCard from '../PatientCard/PatientCard';

const PatientsDisplay = () => {
  const { data: patients, isLoading } = api.patients.list.useQuery();

  if (isLoading) return <p>Loading patients...</p>;
  if (!patients || patients.length === 0)
    return <p className="text-gray-500">No patients found.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientsDisplay;
