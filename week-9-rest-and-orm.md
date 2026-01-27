# Vecka 9 – REST API och Drizzle ORM

## User stories
- Som klient (frontend) vill jag kunna hämta en lista av jobb från ett REST API, så att jag kan visa tillgängliga jobbansökningar i användargränssnittet.
- Som klient vill jag kunna skapa, uppdatera och ta bort jobb via API:et, så att användare kan hantera sina jobbansökningar.
- Som klient vill jag kunna hantera användare (`users`) som är kopplade till jobb, så att varje jobbansökning kan spåras till rätt användare.

## Teknikfokus
- **REST-arkitektur** – Standard för att designa API:er
- **CRUD-endpoints i Express** – Implementera Create, Read, Update, Delete
- **Drizzle ORM** – Typesäker databashantering för TypeScript
- **Felhantering i API** – Returnera korrekta statuskoder och felmeddelanden

## Uppgift

### 1. Sätt upp Drizzle ORM i projektet
   - Installera Drizzle med `npm install drizzle-orm pg` och `npm install -D drizzle-kit @types/pg`.
   - Skapa en `db`-mapp med:
     - `schema.ts` – definiera dina tabeller (users, jobs) med Drizzle-syntax.
     - `index.ts` – exportera databasanslutningen.
   - Konfigurera `drizzle.config.ts` för migrationer.
   - Kör `npx drizzle-kit generate` för att generera migrationer.
   - Kör `npx drizzle-kit migrate` för att applicera dem på databasen.

### 2. Implementera REST-endpoints för jobs
   - Skapa en `routes/jobs.ts`-fil för att organisera dina routes.
   - Implementera alla CRUD-endpoints:
     - `GET /jobs` – Hämta alla jobb från databasen.
     - `GET /jobs/:id` – Hämta ett specifikt jobb baserat på ID.
     - `POST /jobs` – Skapa ett nytt jobb (validera inkommande data).
     - `PUT /jobs/:id` – Uppdatera alla fält på ett jobb.
     - `PATCH /jobs/:id` – Uppdatera enskilda fält på ett jobb.
     - `DELETE /jobs/:id` – Ta bort ett jobb.
   - Använd Drizzle ORM för alla databasoperationer.

### 3. Implementera endpoints för users
   - Skapa en `routes/users.ts`-fil.
   - Implementera grundläggande endpoints:
     - `GET /users` – Hämta alla användare.
     - `GET /users/:id` – Hämta en specifik användare med tillhörande jobb (via relation).
     - `POST /users` – Skapa en ny användare.
     - `DELETE /users/:id` – Ta bort en användare.
   - Använd Drizzles relationer för att hämta kopplade jobb.

### 4. Lägg till felhantering
   - Returnera korrekta HTTP-statuskoder:
     - `200 OK` – Lyckad hämtning.
     - `201 Created` – Resurs skapad.
     - `400 Bad Request` – Ogiltig indata.
     - `404 Not Found` – Resursen finns inte.
     - `500 Internal Server Error` – Serverfel.
   - Skapa tydliga felmeddelanden i JSON-format, t.ex. `{ "error": "Job not found" }`.
   - Hantera edge cases (t.ex. försök att ta bort en användare som inte finns).

### 5. Testa alla endpoints
   - Använd Thunder Client eller Postman.
   - Testa varje endpoint med olika scenarion:
     - Lyckade anrop 
     - Felaktiga ID:n (bör returnera 404).
     - Ogiltig indata (bör returnera 400).
   - Spara gärna en request-collection i repot för enkel delning.

## Teori och reflektionsfrågor

### REST-arkitektur
- Vad står REST för (Representational State Transfer) och vilka principer är viktiga?
  - **Stateless** – Varje request innehåller all nödvändig information.
  - **Uniform interface** – Konsekvent användning av HTTP-metoder och URL-struktur.
  - **Resource-based** – URL:er representerar resurser (t.ex. `/jobs`, `/users`).
- Hur bör URL-strukturen se ut i ett RESTful API?

### HTTP-metoder
- Vad är skillnaden mellan de olika HTTP-metoderna?
  - **GET** – Hämta data (idempotent, ingen sidoeffekt).
  - **POST** – Skapa ny resurs.
  - **PUT** – Ersätt hela resursen.
  - **PATCH** – Uppdatera delar av resursen.
  - **DELETE** – Ta bort resurs.
- Vad betyder "idempotent" och vilka metoder är idempotenta?

### ORM och Drizzle
- Vad är en ORM (Object-Relational Mapping) och varför används det?
- Vilka fördelar ger Drizzle jämfört med att skriva rå SQL?
  - Typsäkerhet med TypeScript.
  - Enklare att underhålla och refaktorera.
  - Skydd mot SQL-injection.
  - Automatisk hantering av relationer.
- Vad är nackdelarna med att använda en ORM?

### Felhantering
- Varför är korrekt felhantering viktigt i ett API?
- Hur bör felmeddelanden struktureras för att vara användbara för klienten?
- Vad är skillnaden mellan klientfel (4xx) och serverfel (5xx)?

## Extrauppgifter
- Lägg till paginering på `GET /jobs` (t.ex. `?page=1&limit=10`).
- Implementera filtrering (t.ex. `GET /jobs?status=applied`).
- Lägg till validering av inkommande data med ett bibliotek som Zod.
