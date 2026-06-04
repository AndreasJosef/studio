import PWABadge from './PWABadge.tsx';
import './App.css';

function App() {
  return (
    <>
      <h1>liquidays</h1>
      <textarea id="today" name="today" cols={30} rows={10}></textarea>
      <PWABadge />
    </>
  );
}

export default App;
