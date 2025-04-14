# Healthcare Patient Management Tech Test

This project is a tech test designed to evaluate your ability to implement a small but well-structured application. It's built using the T3 Stack (Next.js, TypeScript, Tailwind CSS, and Drizzle ORM). This is intended for Full-stack Engineers therefore avoid implementing everything on the client / browser.

## Project Overview

You'll be building a simplified patient management system focusing on appointment scheduling and basic patient information management. The goal is to demonstrate your ability to write clean, maintainable code with proper separation of concerns.

### Assessment Steps

1. **Get it running**

   - Clone the repository and set up the development environment
   - Install dependencies and start the development server, identifying and resolving any issues

2. **Create and seed the database 🌱**

   - The repository contains nearly everything you'll need to get a database up and running
   - Implement the database schema and seed the `patients` table with initial data

3. **List patients and view their details 🚨**

   - List out patients on the home page
   - Implement a patient details view

4. **Add appointments to patients 🚨**
   - Create functionality to add new appointments for each patient
   - Bonus points for displaying appointments on the same page

### Technical Focus Areas

See this short list as our ordered priorities for the assessment. At this stage we're more interested in how you implement a database call over how you'd style a patient card.

1. **Architecture & Patterns**

   - Remember that this is a full-stack role.

2. **Data Management**

3. **UI/UX**

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
1. Create enviornment file:
   ```bash
   cp .env.example .env
   ```
1. Start the development server:
   ```bash
   npm run dev
   ```

## Time Management

We respect your time and wouldn't expect you to spend any more than 3 hours on this assessment. The instructions are intentionally vague to allow you to use your best judgement. As much as this is a small assessment, please assume that we're looking for scaleable, performant and maintainable code.

## Getting Help

Part of the assessment is overcoming obstacles, but if you find yourself stuck, we'd much prefer you to reach out for help. The team are available at [engineering@lutrahealth.com](mailto:engineering@lutrahealth.com) and would be more than happy to help you out.

## Submission

Either host your solution on your GitHub / GitLab / BitBucket account and email us the link, or zip it up and email it to us.

- If you are zipping it up, please do not include your `node_modules` file!
- Email [engineering@lutrahealth.com](mailto:engineering@lutrahealth.com)

## Notes for Candidates

- We work with sensitive personal data
- Document any architectural decisions
- Consider maintainability and scalability

Good luck 🎉

## My Approach

### User Stories

- As a healthcare staff member, I want to **view a list of all patients** so I can manage their care.
- As a staff member, I want to **click on a patient** to view their personal details and history.
- As a staff member, I want to **create appointments** for patients directly from the interface.
- As a staff member, I want to **see a list of past appointments** when viewing a patient.
- As a user, I expect **loading indicators** and **empty states** to clarify what’s happening.

---

### Implementation Overview

#### 1. **Database & Seed Setup**

- The schema for `patients` and `appointments` was provided in the tech test under  
  `src/server/db/schema.ts`.

- Used **Drizzle ORM** and PostgreSQL (via Docker) to initialize and migrate the schema.

- Created a JSON file with seed data at:  
  `scripts/data/patients.json`

- Wrote a script at `scripts/seed.ts` that:

  - Reads data from the JSON file
  - Formats the date strings
  - Inserts the patients into the database via Drizzle

  ```bash
  pnpm dlx tsx scripts/seed.ts
  ```

#### 2. Backend: tRPC API

##### Patients Router

- `list` – Returns all patients
- `get` – Fetches a single patient by ID

##### Appointments Router

- `getByPatientId` – Retrieves all appointments for a given patient
- `create` – Schedules a new appointment

  **Routers are located at:**  
  `src/server/api/routers/`

#### 3. Frontend: React Components

Structured components under `src/app/_components/` for clarity and reuse:

- **PatientsDisplay** – Displays the patient grid and handles modal logic
- **PatientCard** – Shows patient info in the grid
- **PatientModal** – Modal to view and manage a patient's appointments
- **PatientInfo** – Displays full name, email, and date of birth
- **AppointmentList** – Lists all appointments with readable formatting
- **AppointmentForm** – Form to add a new appointment
- **Loading** – A reusable loading spinner with message support

## To Run the App Locally

### Option 1: Start Postgres with Docker (recommended)

Make sure you have Docker installed, then run:

```bash
docker run --name lutra-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=lutra-tech-test \
  -p 5432:5432 \
  -d postgres
```

### Option 2: Use a Local Postgres Installation

1. Create a database named `lutra-tech-test`
2. Set the user to `postgres`
3. Set the password to `password`
4. Ensure the database is running on port `5432`

Then proceed with the setup steps below.

1. Install dependencies:

```bash
pnpm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Open the .env file and add the API key:

```
API_KEY="test-key"
```

4. Push the database schema:

```bash
pnpm db:push
```

5. (Optional) Generate Drizzle types:

```bash
pnpm db:generate
```

6. Seed the database with initial data:

```bash
pnpm dlx tsx scripts/seed.ts
```

7. Start the development server:

```bash
pnpm dev
```

8. Visit the app in your browser:
   http://localhost:3000

## Future Improvements

### Testing

- Add unit tests for all components, especially:
  - `patientsRouter`, `appointmentsRouter` (API logic)
  - `scripts/seed.ts` (e.g. mock DB and assert input)
- Add integration tests for end-to-end flows:
  - Viewing, adding, and listing appointments
- Add component/UI testing using **Cypress**

### Better Error Handling

- Display toast notifications or alerts when API calls fail (e.g. appointment creation errors)
- Surface validation errors from backend (e.g. Zod parsing issues)

---

### UX Enhancements

- Use a date-picker component instead of a raw `datetime-local` input
- Visually highlight upcoming appointments
- Allow editing or deleting appointments from the UI
