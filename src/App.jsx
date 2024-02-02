import './App.css';
import { useState, useEffect } from 'react';
import Letters from './components/Letters/Letters'
import useLetters from './hooks/useLetters'
import { letters } from "./constants/constants";
import Keyboard from './components/Keyboard/Keyboard';

function App() {
  const [headline, setHeadline] = useState('Тренажёр печати вслепую');
  const [position, setPosition] = useState(0);
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [quantity, setQuantity] = useState(16);
  const [language, setLanguage] = useState('eng');
  const [pressedButton, setPressedButton] = useState('');
  const [expectedButton, setExpectedButton] = useState('');
  const [ lettersOrder, lettersStats, setLettersStats ] = useLetters({
    letters: letters,
    lettersRange: 2,
    lang: language,
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
      evt.preventDefault();
      const code = evt.keyCode;
      if (!isEnd && letters.usedKeyCodes.includes(String(code))) {
        const pressedButtonCodeMapping = letters.keyCodesToLettersMapping[code];
        const pressedButtonIsShifted = evt.shiftKey ? 'shifted' : 'native';
        const pressedButtonValue = letters[language][pressedButtonCodeMapping.line][pressedButtonIsShifted][pressedButtonCodeMapping.position].value;
        const pressedButton = {value: pressedButtonValue, shifted: evt.shiftKey, key: code};
        const expectedButton = lettersOrder[position];
        const stats = lettersStats[expectedButton.value];
        stats.button.push(pressedButton.value);
        stats.time.push(getTimeInterval());
        setLettersStats(state => ({...state, [expectedButton.value]: stats}));
        setPressedButton(pressedButton);
        setExpectedButton(expectedButton);
        if (pressedButton.value === expectedButton.value) {
          setPosition(state => state + 1);
        }
        setCount(state => state + 1);

      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [getTimeInterval, isEnd, language, lettersOrder, lettersStats, position, setLettersStats]);
  return (
    <div className="App">
      <header className="header">

      </header>
      <main className="main">
        <h1 className="headline">{headline}</h1>
        <Letters lettersOrder={lettersOrder} position={position} quantity={quantity} setIsEnd={setIsEnd}/>
        <Keyboard language={language} count={count} pressedButton={pressedButton} expectedButton={expectedButton} />
      </main>
      <footer className="footer">

      </footer>
    </div>
  );
}

export default App;
