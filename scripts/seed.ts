import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { patients } from '../src/server/db/schema';
import fs from 'fs';
import path from 'path';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set.');
}

/**
 * Initialize Postgres client using DATABASE_URL from .env
 */
const client = postgres(process.env.DATABASE_URL);

/**
 * Create a Drizzle ORM instance using the Postgres client
 */
const db = drizzle(client);

/**
 * Converts a JavaScript `Date` object to a string formatted as YYYY-MM-DD.
 * This is required because PostgreSQL `.date()` expects a string, not a Date object.
 *
 * @param {Date} d - The date to convert
 * @returns {string} - Formatted date string
 */
const toDateString = (d: Date): string => d.toISOString().split('T')[0]!;

/**
 * Path to the JSON file containing patient seed data
 */
const jsonPath = path.join(__dirname, 'data', 'patients.json');

/**
 * Raw JSON content loaded from the file system
 */
const rawData = fs.readFileSync(jsonPath, 'utf-8');

/**
 * Parsed patient objects from the JSON file
 */
const parsedPatients = JSON.parse(rawData);

/**
 * Normalized patient data with formatted date strings,
 * ready to be inserted into the database.
 */
const seedPatients = parsedPatients.map((p: any) => ({
  ...p,
  dateOfBirth: toDateString(new Date(p.dateOfBirth)),
}));

/**
 * Seed the patients table with example data from the JSON file.
 * Exits the process after completion or failure.
 */
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
