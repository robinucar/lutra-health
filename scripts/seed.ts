import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { patients } from '../src/server/db/schema';
import fs from 'fs';
import path from 'path';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set.');
}

const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client);

// Converts a JavaScript Date object to a YYYY-MM-DD string
const toDateString = (d: Date): string => d.toISOString().split('T')[0]!;

// Load patients from JSON
const jsonPath = path.join(__dirname, 'data', 'patients.json');
const rawData = fs.readFileSync(jsonPath, 'utf-8');
const parsedPatients = JSON.parse(rawData);

// Prepare and normalize date format
const seedPatients = parsedPatients.map((p: any) => ({
  ...p,
  dateOfBirth: toDateString(new Date(p.dateOfBirth)),
}));

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
