import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";
import { patients } from "../../db/schema";
import { TRPCError } from "@trpc/server";

/**
 * TRPC router for handling patient-related operations.
 *
 * Includes:
 * - `list`: Fetches all patients
 * - `get`: Fetches a single patient by ID
 */
export const patientsRouter = createTRPCRouter({
	/**
	 * Retrieves a list of all patients in the database.
	 *
	 * @procedure
	 * @returns {Promise<Patient[]>} - An array of patient records
	 */
	list: publicProcedure.query(() => {
		return db.select().from(patients);
	}),

	/**
	 * Retrieves a single patient by their unique ID.
	 *
	 * @procedure
	 * @input {Object} - Input object containing the patient ID
	 * @throws {TRPCError} - If no patient is found with the provided ID
	 * @returns {Promise<Patient>} - The matched patient record
	 */
	get: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			const patient = await db.query.patients.findFirst({
				where: (p, { eq }) => eq(p.id, input.id),
			});

			if (!patient) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Patient not found",
				});
			}

			return patient;
		}),
});
