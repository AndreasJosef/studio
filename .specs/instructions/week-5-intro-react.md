# Vecka 5 – React-grunder

## User stories

- Som användare vill jag kunna se en lista av jobb.
- Som användare vill jag se tydlig information om varje jobb (titel, företag, ort, typ av tjänst etc.).

## Teknikfokus

- Intro till React
- JSX
- Komponenter
- Props
- Listor

## Uppgift

1. Skapa ett nytt React-projekt (Typescript) för JobChaser med Vite.
2. Lägg till en statisk lista med jobb. Använd arrayen med objektdata i `data.ts`. SVG-ikoner finns under `/assets`
3. Skapa komponenter:
   - `JobList` som tar emot en lista av jobb via props och renderar dem.
   - `JobItem` som visar information om ett jobb.
4. Rendera listan av jobb i UI:
   - Använd `map` för att skapa en lista med `JobItem`-komponenter.
   - Använd semantiska HTML-element. För styling använder antingen global CSS (vanlig), CSS moduler eller Tailwind CSS
5. Implementera konditionell rendering:
   - Om listan är tom ska texten "Inga jobb" visas.

## Teori / reflektionsfrågor

Besvara kortfattat i denna fil eller i en separat `theory-week-5.md`:

- Hur och varför uppstod React?
- Vad är JSX?
- Vad är en komponent i React?
- Vad är props och hur används de?
- Vad menas med "one-way data flow" i React?
- Vad är ett komponentträd? Rita ett och hur datan går genom komponenterna.
- Hur kan man använda konditionell rendering i React?
- Vad menas med en återanvändbar komponent?
- Vad är React Fragment (</>)?
