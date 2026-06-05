import PWABadge from './PWABadge.tsx';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function App() {
  const now = new Date();
  return (
    <>
      <h1>{`${days[now.getDay()]}, ${now.toLocaleDateString()}`}</h1>

      <main className="flex flex-col">
        <textarea id="journal" name="journal">
          What is on your mind
        </textarea>
        <button type="submit">Compile</button>
      </main>

      <nav>
        <a href="#">Journal</a>
        <a href="#">Agenda</a>
      </nav>

      <PWABadge />
    </>
  );
}

export default App;
