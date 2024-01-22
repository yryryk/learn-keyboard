import './App.css';
import { useState, useEffect } from 'react';
import Letters from './components/Letters/Letters'
import useLetters from './hooks/useLetters'

function App() {
  const [headline, setHeadline] = useState('Уровень 1');
  const [position, setPosition] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [quantity, setQuantity] = useState(16);
  useEffect(() => {
    const handleKeyPress = () => {
      if (!isEnd) {
        setPosition(state => state + 1);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isEnd]);

  const [ lettersOrder, lettersStats, setLettersStats ] = useLetters({
    lettersRange: 1,
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
        <Letters lettersOrder={lettersOrder} position={position} quantity={quantity} setIsEnd={setIsEnd}/>
      </main>
      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
