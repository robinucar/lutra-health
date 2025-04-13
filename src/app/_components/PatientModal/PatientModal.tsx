'use client';

import { api } from '@lutra/trpc/react';
import { useEffect, useMemo } from 'react';
import Loading from '../Loading/Loading';

type PatientModalProps = {
	id: number;
	onClose: () => void;
};

const PatientModal = ({ id, onClose }: PatientModalProps) => {
	const { data: patient, isLoading } = api.patients.get.useQuery({ id });

	// Close modal on when user clicks ESC key
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	// Format patients date of birth
	const formattedDate = useMemo(() => {
		if (!patient?.dateOfBirth) return 'N/A';
		return new Date(patient.dateOfBirth).toLocaleDateString('en-GB');
	}, [patient]);

	// Loading patients details
	if (isLoading) return <Loading message="Loading patients details..." />;

	if (!patient) return null;

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200"
			role="dialog"
			aria-modal="true"
			aria-labelledby="patient-modal-title"
		>
			{/* Modal content: prevent click bubbling */}
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
			>
				<h2 id="patient-modal-title" className="text-xl font-bold mb-2">
					{patient.firstName} {patient.lastName}
				</h2>
				<p className="text-sm text-gray-700 mb-2">
					<strong>Email:</strong> {patient.email ?? 'N/A'}
				</p>
				<p className="text-sm text-gray-700 mb-4">
					<strong>Date of Birth:</strong> {formattedDate}
				</p>
				<button
					onClick={onClose}
					className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default PatientModal;
