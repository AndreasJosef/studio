# JobChaser – Fullstack-projekt (Chas Academy)

JobChaser är en modern webbapplikation för att söka, bevaka och hantera jobbannonser. Projektet är utvecklat som en inlämningsuppgift inom Fullstack JavaScript-programmet vid Chas Academy.

Fokus i projektet har varit att bygga en industriell "Refinery"-arkitektur där data förädlas genom strikt typsäkerhet, från externa API-svar till lagring i databas och slutligen presentation i ett reaktivt UI.

## Teknisk Arkitektur & Typsäkerhet

Projektets ryggrad är en End-to-End typsäkerhet som säkerställer att ingen korrupt data når systemets kärna.
Domändriven validering (Zod + Drizzle)

 - API-Refinery: För att hantera externa data (t.ex. från Arbetsförmedlingen) har jag byggt valideringslogik med Zod. Detta garanterar att externa svar transformeras till våra interna domäntyper innan de används.

- Persistent Lager: Genom Drizzle ORM speglas våra domänscheman direkt i PostgreSQL. Detta eliminerar glappet mellan kod och databas.

- Middleware-logik: I backend används specialbyggda Express-middlewares som validerar inkommande requests mot Zod-scheman, vilket gör våra controllers 100% typsäkra.

**Avancerad Datahämtning**

Jag har utvecklat en egen typsäker fetch-wrapper. Denna tillåter oss att skicka in Zod-scheman vid varje anrop, vilket ger oss automatiskt typat resultat och validering i ett och samma steg. Detta lager är förberett för att enkelt kunna migrera till TanStack Query för optimerad caching.
Frontend-filosofi

Applikationen använder TanStack Router för typsäker routing. Frontend är idag organiserad enligt en Feature-based layout, men som ett led i projektets utveckling har jag påbörjat en övergång mot en Fluid Functional-struktur (slice-based development) för att bättre isolera domänlogik från UI.

## Deployment

Projektet är driftsatt på en egen Linux-server (Hetzner) med en modern container-baserad arkitektur.
Infrastrukturöversikt

Systemet är uppdelat i tre isolerade lager:

- Reverse Proxy (Caddy): Hanterar HTTPS (SSL) automatiskt och dirigerar trafik. /api/* pekar mot backend, medan övrig trafik landar i frontend-containern.

- Applikationslager (Podman): Både frontend (Vite) och backend (Express) körs som isolerade OCI-containrar (node:24-slim) för maximal säkerhet och minimal image-storlek.

- Databaslager (PostgreSQL): Körs i en dedikerad container med persistenta volymer.

## Monorepo & Build-pipeline

Projektet är ett pnpm-monorepo med delade paket (t.ex. @jobchaser/domain).

- Byggprocess: Containrarna byggs från rotkatalogen för att ge Docker-build-kontexten tillgång till alla lokala beroenden i /packages.

- Git Submoduler: Används för att integrera kodbaser från olika repon men hanteras sömlöst i build-steget på servern.

- Migrations: Databasschemat synkas i realtid via drizzle-kit push inifrån API-containern vid deployment.


## Framtida Förbättringar

Robust Felhantering i UI: Implementera en global fel-komponent för att hantera "success/error states" mer enhetligt i UI:t.

State & Caching: Fullfölja integrationen av TanStack Query för att minska antalet API-anrop och förbättra användarupplevelsen.

### UI-Refinement:

- Fortsätta utvecklingen av det semantiska temasystemet (Tailwind 4) för att täcka fler edge-cases i dark/light mode.
- Förbättra Responsiveness
- Bygga klart features som jag har redan påbörjat: kontaktsida etc.

### Tech Stack

- Frontend: React (Vite), Tailwind 4, TanStack Router, Zustand.
- Backend: Node.js (Express), Zod, Drizzle ORM.
- Infrastruktur: PostgreSQL, Caddy, Podman, Hetzner Cloud.
- Verktyg: pnpm workspaces, Typescript, Git Submodules.

Projektet representerar en djupdykning i hur man bygger skalbara, typsäkra system med modern webbteknik.
