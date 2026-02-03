# Vecka 7 – Routing och Context

## User stories
- Som användare vill jag kunna besöka sidan `/jobs` där jag ser listan av jobb.
- Som användare vill jag kunna besöka `/signup` där det finns ett formulär för att registrera konto.
- Som användare vill jag kunna besöka `/signin` där det finns ett formulär för inloggning.
- Som användare vill jag kunna växla mellan dark mode och light mode, och se valet slå igenom på alla sidor.

## Teknikfokus
- Routing med React Router (kodbaserad routing)
- Intro till filbaserad routing (konceptuellt/TanStack Router)
- Context API
- Globalt tema (dark/light)
- React Hook Form 

## Uppgift
1. Installera och konfigurera React Router ELLER Tanstack Router i frontend-projektet.
2. Skapa följande routes:
   - `/jobs` – visar jobblistan från tidigare veckor.
   - `/signup` – visar ett registreringsformulär (ingen riktig backend-koppling ännu).
   - `/signin` – visar ett login-formulär.
3. Skapa en `Header`/`Nav`-komponent:
   - Länkar till `/jobs`, `/signup`, `/signin`.
   - Visas på alla sidor.
4. Använd React Hook Form för att hantera registrerings- och login-formuläret
4. Skapa ett Theme Context:
   - Global state för `theme` (`"light"`/`"dark"`).
   - En knapp i headern/nav som växlar tema.
   - Tillämpa tema på hela appen (val av metod beroende hur du använder CSS)


## Teori / reflektionsfrågor
- Vad menas med routing i en webapp?
- Vad är fördelar / nackdelar med kodbaserad routing vs. filbaserad?
- Vad är fördelarna med att använda React Hook Form?
- Vad är syftet med Context API?
- Vilket problem med props löser Context?


## Extrauppgifter
1. Implentera formulärvalidering med biblioteket Zod
2. Implementera både filbaserad routing och kodbaserad och utvärdera produktivitet och andra fördelar / nackdelar
3. Nested Routes – Skapa /jobs/:id för att visa detaljer om ett specifikt jobb
4. Använd Framer Motion eller CSS transitions för att animera sidbyten
5. Skapa ett User Context som håller koll på "inloggad" användare (simulera med localStorage)
6. Skapa en route /profile som bara är tillgänglig om användaren är "inloggad" (simulera med Context/localStorage)
7. History Navigation – Lägg till "Tillbaka"-knapp som använder browser history API
8. Skapa ett Context för toast-meddelanden (t.ex. "Jobb tillagt!" när man lägger till ett jobb)

## Bra att veta: Authentisering kommer att göras i vecka 10 med JWT. 
