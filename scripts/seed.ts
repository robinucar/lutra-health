import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { patients } from '../src/server/db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set.');
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

// Converts a JavaScript Date object to a YYYY-MM-DD string.
// This is necessary because the `dateOfBirth` column in the database is a Postgres `date` type,
// and Drizzle ORM expects string values in 'YYYY-MM-DD' format for `.date()` columns —
// not JavaScript `Date` objects.
// Without this conversion, TypeScript will throw a type error during insertion.
const toDateString = (d: Date): string => d.toISOString().split('T')[0]!;


const seedPatients = [
  {
    firstName: 'Patient',
    lastName: 'One',
    email: 'patientone@example.com',
    dateOfBirth: toDateString(new Date('1985-06-12')),
  },
  {
    firstName: 'Patient',
    lastName: 'Two',
    email: 'patienttwo@example.com',
    dateOfBirth: toDateString(new Date('1979-11-23')),
  },
  {
    firstName: 'Patient',
    lastName: 'Three',
    email: 'patientthree@example.com',
    dateOfBirth: toDateString(new Date('1992-01-04')),
  },
];

const seed = async (): Promise<void> => {
  try {
    await db.insert(patients).values(seedPatients);
    console.log(`[${new Date().toISOString()}] Seeded patients table successfully!`);
    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seed();
