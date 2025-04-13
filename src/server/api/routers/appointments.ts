import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { db } from '../../db';
import { appointments, appointmentStatusEnum } from '../../db/schema';

const statusValues = appointmentStatusEnum.enumValues;

export const appointmentsRouter = createTRPCRouter({
	getByPatientId: publicProcedure
		.input(z.object({ patientId: z.number() }))
		.query(async ({ input }) => {
			return await db.query.appointments.findMany({
				where: (apt, { eq }) => eq(apt.patientId, input.patientId),
			});
		}),

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