import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';
import { appointments, appointmentStatusEnum } from '../../db/schema';

/**
 * Allowed status values for an appointment.
 */
const statusValues = appointmentStatusEnum.enumValues;

/**
 * TRPC router for managing appointments.
 *
 * Includes:
 * - `getByPatientId`: Fetches all appointments for a given patient
 * - `create`: Creates a new appointment for a patient
 */
export const appointmentsRouter = createTRPCRouter({
	/**
	 * Get all appointments for a specific patient.
	 *
	 * @input {Object} - Object containing `patientId`
	 * @returns {Promise<Array>} - Array of appointments for the patient
	 */
	getByPatientId: publicProcedure
		.input(z.object({ patientId: z.number() }))
		.query(async ({ input }) => {
			return await db.query.appointments.findMany({
				where: (appt, { eq }) => eq(appt.patientId, input.patientId),
			});
		}),

	/**
	 * Create a new appointment for a patient.
	 *
	 * @input {Object} - Appointment data including patient ID, date, status, reason, and optional notes
	 * @returns {Promise<void>} - Success result of the insert operation
	 */
	create: publicProcedure
		.input(
			z.object({
				patientId: z.number(),
				scheduledFor: z.string(),
				status: z.enum(statusValues),
				reason: z.string().min(1),
				notes: z.string().optional(),
			}),
		)
		.mutation(async ({ input }) => {
			const result = await db.insert(appointments).values({
				patientId: input.patientId,
				scheduledFor: new Date(input.scheduledFor),
				status: input.status,
				reason: input.reason,
				notes: input.notes,
			});
			return result;
		}),
});
