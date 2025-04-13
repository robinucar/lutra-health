'use client';

import { useEffect, useMemo, useState } from 'react';
import { api } from '@lutra/trpc/react';
import { appointmentStatusEnum } from '../../../server/db/schema';
import Loading from '../Loading/Loading';
import PatientInfo from './PatientInfo/PatientInfo';
import AppointmentList from './AppointmentList/AppointmentList';
import AppointmentForm from './AppointmentForm/AppointmentForm';

type PatientModalProps = {
	id: number;
	onClose: () => void;
};

const PatientModal = ({ id, onClose }: PatientModalProps) => {
	const { data: patient, isLoading } = api.patients.get.useQuery({ id });
	const { data: appointments, isLoading: appointmentsLoading } =
		api.appointments.getByPatientId.useQuery({ patientId: id });

	const utils = api.useUtils();

	const createAppointment = api.appointments.create.useMutation({
		onSuccess: async () => {
			await utils.appointments.getByPatientId.invalidate({ patientId: id });
			resetForm();
		},
	});

	const [form, setForm] = useState<{
		scheduledFor: string;
		status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
		reason: string;
		notes: string;
	}>({
		scheduledFor: '',
		status: 'SCHEDULED',
		reason: '',
		notes: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!form.reason || !form.scheduledFor) return;
		createAppointment.mutate({ ...form, patientId: id });
	};

	const resetForm = () => {
		setForm({ scheduledFor: '', status: 'SCHEDULED', reason: '', notes: '' });
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	const formattedDate = useMemo(() => {
		if (!patient?.dateOfBirth) return 'N/A';
		return new Date(patient.dateOfBirth).toLocaleDateString('en-GB');
	}, [patient]);

	if (isLoading) return <Loading message="Loading patient details..." />;
	if (!patient) return null;

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200"
			role="dialog"
			aria-modal="true"
			aria-labelledby="patient-modal-title"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl overflow-y-auto max-h-[90vh]"
			>
				<PatientInfo patient={patient} formattedDate={formattedDate} />
				<AppointmentList
					appointments={appointments}
					isLoading={appointmentsLoading}
				/>
				<AppointmentForm
					form={form}
					onChange={handleChange}
					onSubmit={handleSubmit}
					enumValues={appointmentStatusEnum.enumValues}
				/>
				<button
					onClick={onClose}
					className="mt-4 w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default PatientModal;
