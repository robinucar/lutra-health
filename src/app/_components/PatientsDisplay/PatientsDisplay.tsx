'use client';

import { useState, type JSX } from 'react';
import { api } from '@lutra/trpc/react';
import PatientCard from '../PatientCard/PatientCard';
import PatientModal from '../PatientModal/PatientModal';
import Loading from '../Loading/Loading';

/**
 * PatientsDisplay component
 *
 * This component fetches and displays a list of patients in a grid layout.
 * Users can click on a patient card to view detailed information and manage appointments
 * in a modal.
 *
 * - Displays a loading indicator while fetching data
 * - Shows a "No patients found" message if the list is empty
 * - Opens a `PatientModal` when a card is clicked
 *
 * @returns {JSX.Element} A grid of patient cards with optional modal detail view
 */
const PatientsDisplay = (): JSX.Element => {
  const { data: patients, isLoading } = api.patients.list.useQuery();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  if (isLoading) return <Loading message="Loading patients..." />;
  if (!patients || patients.length === 0)
    return <p className="text-gray-500">No patients found.</p>;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onClick={() => setSelectedPatientId(patient.id)}
          />
        ))}
      </div>

      {selectedPatientId !== null && (
        <PatientModal id={selectedPatientId} onClose={() => setSelectedPatientId(null)} />
      )}
    </>
  );
};

export default PatientsDisplay;
