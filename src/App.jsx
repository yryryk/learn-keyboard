import './App.css';
import { useState, useEffect } from 'react';
import Letters from './components/Letters/Letters'
import useLetters from './hooks/useLetters'

function App() {
  const [headline, setHeadline] = useState('Уровень 1');
  const [position, setPosition] = useState(0);
  const [quantity, setQuantity] = useState(16);
  useEffect(() => {
    const handleKeyPress = () => {
      setPosition(state => state + 1);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const [ lettersOrder, lettersStats, setLettersStats ] = useLetters({
    lettersRange: 2,
    lang: 'eng',
    isNumbers: true,
    isShifted: false,
  });
  return (
    <div className="App">
      <header className="header">

      </header>
      <main className="main">
        <h1 className="">{headline}</h1>
        <Letters lettersOrder={lettersOrder} position={position} quantity={quantity} />
      </main>
      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
