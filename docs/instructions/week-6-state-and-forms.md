# Vecka 6 – State, datahämtning och formulär

## User stories
- Som användare ska jag kunna filtrera jobb i listan baserat på en sökterm
- Som användare vill jag kunna se när jobben laddas in.
- Som användare ska jag kunna lägga till ett jobb via ett formulär (lagras i local state).

## Teknikfokus
- `useState`
- `useEffect` för datahämtning
- Formulär
- Kontrollerade komponenter
- Enkel loading-state

## Uppgift
1. Lägg till ett sökfält ovanför jobblistan:
   - Använd `useState` för att lagra söktermen.
   - Filtrera jobblistan baserat på söktermen (t.ex. på jobbtitel eller företag).
2. Gör sökfältet till en kontrollerad komponent:
   - Värdet styrs av state, `onChange` uppdaterar state.
3. Flytta jobbdatan till en separat JSON-fil eller en utforska ett externt API som tillhandahåller jobannsonser.
4. Använd `useEffect` för att hämta jobben:
   - Visa en loader eller texten "Laddar jobb…" medan data hämtas.
   - Hantera ev. fel (t.ex. visa ett felmeddelande).

## Teori / reflektionsfrågor
- Vad är lokalt state i React? Vad är syftet med Hook:en `useState`?
- Vad är skillnaden mellan state och props?
- Vad menas med en kontrollerad komponent?
- Vad är en callback handler i React-sammanhang?
- Skissa och förklara komponentträdet och hur data går genom komponenterna.
- Vad menas med "lifting state up"?
- Vad är en side-effect (sidoeffekt) och vad är syftet med `useEffect`?
- Vad är syftet med dependency-arrayen i `useEffect`?

## Extrauppgifter
   1. Skapa ett formulär för att lägga till ett nytt jobb:
   * Kontrollerade inputs (titel, företag, ort, etc.).
   * Vid submit: lägg till jobbet i jobblistan (local state).
   * Töm formuläret efter lyckad submit.
   2. Skapa en s.k. debounce i sökrutan (fördröjning av användarens input) med biblioteket Lodash eller React `useDeferredValue` (React 19). Implementera funktionaliteten som en s.k. custom hook.
   3. Implementera autocomplete i sökrutan. Egen funktion utan extra bibliotek. Använd Hook:en `useRef`.
   4. Visa en animerad loader när jobben laddas in. Använd en fördröjning med `setTimeout` om det behövs för att den ska visas. Tips: Använd `Promise.all` som väntar på både fetch och en 1 sekunds timeout.
   5. Utforska andra alternativ för datahämtning istället för useEffect. 
   * React Query / TanStack Query 
   * SWR (Vercel)
   * use() hook (React 19)
   

