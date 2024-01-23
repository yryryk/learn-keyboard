import './App.css';
import { useState, useEffect } from 'react';
import Letters from './components/Letters/Letters'
import useLetters from './hooks/useLetters'
import { letters } from "./constants/constants";

function App() {
  const [headline, setHeadline] = useState('Уровень 1');
  const [position, setPosition] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [quantity, setQuantity] = useState(16);
  const [ lettersOrder, lettersStats, setLettersStats ] = useLetters({
    lettersRange: 2,
    lang: 'eng',
    isNumbers: true,
    isShifted: false,
  });
  function measureTimeInterval() {
    let prevTime = performance.now();
    function start() {
      prevTime = performance.now();
    };
    function getTimeInterval() {
      const time = performance.now();
      const timeInterval = time - prevTime;
      prevTime = time;
      return timeInterval
    };

    return [start, getTimeInterval]
  };
  const [start, getTimeInterval] = measureTimeInterval();

  useEffect(() => {
    function handleKeyPress (evt) {
      const code = evt.keyCode;
      if (!isEnd && letters.usedKeyCodes.includes(String(code))) {
        setPosition(state => state + 1);
        const pressedButton = evt.key;
        const expectedButton = lettersOrder[position];
        const stats = lettersStats[expectedButton];
        stats.button.push(pressedButton);
        stats.time.push(getTimeInterval());
        setLettersStats(state => ({...state, [expectedButton]: stats}));
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [getTimeInterval, isEnd, lettersOrder, lettersStats, position, setLettersStats]);
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
