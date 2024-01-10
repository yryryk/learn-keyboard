import './App.css';
import { useState } from 'react';
import Letters from './components/Letters/Letters'

function App() {
  const [headline, setHeadline] = useState('Уровень 1');
  return (
    <div className="App">
      <header className="header">

      </header>
      <main className="main">
        <h1 className="">{headline}</h1>
        <Letters />
      </main>
      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
