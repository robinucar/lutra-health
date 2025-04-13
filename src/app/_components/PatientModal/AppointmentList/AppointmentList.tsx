import type { InferSelectModel } from 'drizzle-orm';
import { appointments } from '../../../../server/db/schema';

type Appointment = InferSelectModel<typeof appointments>;

type AppointmentListProps = {
	appointments?: Appointment[];
	isLoading: boolean;
};

const AppointmentList = ({ appointments, isLoading }: AppointmentListProps) => {
	return (
		<div className="mb-4">
			<h3 className="font-semibold mb-2">Appointments</h3>
			{isLoading ? (
				<p className="text-sm text-gray-500">Loading appointments...</p>
			) : appointments?.length ? (
				<ul className="text-sm divide-y max-h-48 overflow-y-auto">
					{appointments.map((appt) => (
						<li key={appt.id} className="py-2">
							<div><strong>Status:</strong> {appt.status}</div>
							<div>
								<strong>When:</strong>{' '}
								{new Date(appt.scheduledFor).toLocaleString('en-GB')}
							</div>
							<div><strong>Reason:</strong> {appt.reason}</div>
							{appt.notes && <div><strong>Notes:</strong> {appt.notes}</div>}
						</li>
					))}
				</ul>
			) : (
				<p className="text-sm text-gray-500">No appointments found.</p>
			)}
		</div>
	);
};

export default AppointmentList;
