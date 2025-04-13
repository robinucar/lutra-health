import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "../../db";
import { patients } from "../../db/schema";
import { TRPCError } from "@trpc/server";

export const patientsRouter = createTRPCRouter({
	list: publicProcedure.query(() => {
		return db.select().from(patients);
	}),

	get: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			const patient = await db.query.patients.findFirst({
				where: (p, { eq }) => eq(p.id, input.id),
			});

			if (!patient) {
				throw new TRPCError({ code: "NOT_FOUND", message: "Patient not found" });
			}

			return patient;
		}),
});
