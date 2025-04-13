import type { JSX } from "react";

type AppointmentFormProps = {
	/**
	 * Form state containing appointment details to be submitted.
	 */
	form: {
		scheduledFor: string;
		status: string;
		reason: string;
		notes: string;
	};

	/**
	 * Handler for updating form input fields.
	 *
	 * @param {React.ChangeEvent} e - Input, textarea, or select change event
	 */
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;

	/**
	 * Handler for submitting the appointment form.
	 *
	 * @param {React.FormEvent} e - Form submit event
	 */
	onSubmit: (e: React.FormEvent) => void;

	/**
	 * Enum values for the appointment status (e.g., 'SCHEDULED', 'CONFIRMED', etc.)
	 */
	enumValues: string[];
};

/**
 * Appointment creation form component.
 * Accepts form state, change/submit handlers, and a list of status options.
 *
 * @component
 * @param {AppointmentFormProps} props - Props for managing appointment creation
 * @returns {JSX.Element} A form to add a new appointment
 */
const AppointmentForm = ({ form, onChange, onSubmit, enumValues }: AppointmentFormProps): JSX.Element => {
	return (
		<form onSubmit={onSubmit} className="space-y-3">
			<h3 className="font-semibold">Add Appointment</h3>

			<input
				type="datetime-local"
				name="scheduledFor"
				value={form.scheduledFor}
				onChange={onChange}
				className="w-full border rounded px-2 py-1 text-sm"
				required
			/>

			<select
				name="status"
				value={form.status}
				onChange={onChange}
				className="w-full border rounded px-2 py-1 text-sm"
			>
				{enumValues.map((status) => (
					<option key={status} value={status}>
						{status}
					</option>
				))}
			</select>

			<input
				type="text"
				name="reason"
				value={form.reason}
				onChange={onChange}
				placeholder="Reason"
				className="w-full border rounded px-2 py-1 text-sm"
				required
			/>

			<textarea
				name="notes"
				value={form.notes}
				onChange={onChange}
				placeholder="Notes (optional)"
				className="w-full border rounded px-2 py-1 text-sm"
			/>

			<button
				type="submit"
				className="w-full bg-blue-600 text-white rounded px-4 py-2 text-sm hover:bg-blue-700 transition"
			>
				Add Appointment
			</button>
		</form>
	);
};

export default AppointmentForm;
