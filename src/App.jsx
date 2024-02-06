import "./App.css";
import { useState, useEffect } from "react";
import Letters from "./components/Letters/Letters";
import useLetters from "./hooks/useLetters";
import { letters } from "./constants/constants";
import Keyboard from "./components/Keyboard/Keyboard";
import Bar from "./components/SettingsBar/SettingsBar";
import StatisticsPanel from './components/StatisticsPanel/StatisticsPanel'

function App() {
  const [unit, setUnit] = useState(window.innerWidth / 24);
  const [position, setPosition] = useState(0);
  const [count, setCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [quantity, setQuantity] = useState(20);
  const [language, setLanguage] = useState("eng");
  const [pressedButton, setPressedButton] = useState("");
  const [expectedButton, setExpectedButton] = useState("");
  const [numbers, setNumbers] = useState(true);
  const [shifted, setShifted] = useState(false);
  const [lettersRange, setLettersRange] = useState(1);
  const [buttons, setButtons] = useState({});
  const [distance, setDistance] = useState(0);
  const [start, setStart] = useState({});
  const [getTimeInterval, setGetTimeInterval] = useState({});
  const [points, setPoints] = useState({
    velocity: 0,
    accuracy: 0,
    all: 0,
  });
  const [lettersOrder, lettersStats, setLettersStats, refreshLetters] =
    useLetters({
      letters: letters,
      lettersRange: lettersRange,
      lang: language,
      isNumbers: numbers,
      isShifted: shifted,
    });

  useEffect(() => {
    function measureTimeInterval() {
      let prevTime = performance.now();
      function start() {
        prevTime = performance.now();
      }
      function getTimeInterval() {
        const time = performance.now();
        const timeInterval = time - prevTime;
        prevTime = time;
        return timeInterval;
      }
      return [start, getTimeInterval];
    }
    const [start, getTimeInterval] = measureTimeInterval();

    setStart({func: start});
    setGetTimeInterval({func: getTimeInterval});
  }, []);

  useEffect(() => {
    function handleKeyPress(evt) {
      evt.preventDefault();
      const code = evt.keyCode;
      if (!isEnd && letters.usedKeyCodes.includes(String(code))) {
        const pressedButtonCodeMapping = letters.keyCodesToLettersMapping[code];
        const pressedButtonIsShifted = evt.shiftKey ? "shifted" : "native";
        const pressedButtonValue =
          letters[language][pressedButtonCodeMapping.line][
            pressedButtonIsShifted
          ][pressedButtonCodeMapping.position].value;
        const pressedButton = {
          value: pressedButtonValue,
          shifted: evt.shiftKey,
          key: code,
        };
        const expectedButton = lettersOrder[position];
        const stats = lettersStats[expectedButton.value];
        const pressedButtonKey = pressedButton.key;
        const expectedButtonKey = expectedButton.key;
        const distanceX = Math.abs(buttons[pressedButtonKey].x - buttons[expectedButtonKey].x);
        const distanceY = Math.abs(buttons[pressedButtonKey].y - buttons[expectedButtonKey].y);
        setDistance(state => state + Math.round(Math.sqrt(distanceX**2 + distanceY**2)/unit));
        setPressedButton(pressedButton);
        setExpectedButton(expectedButton);
        if (pressedButton.value === expectedButton.value) {
          const time = Math.round(getTimeInterval.func());
          const pointsTime = Math.round(time / 333) > 16 ? 15 : Math.round(time / 333) - 1;
          const pointsDistance = distance > 15 ? 15 : distance;
          const newPoints = {...points};
          newPoints.velocity += 15 - pointsTime;
          newPoints.accuracy += 15 - pointsDistance;
          newPoints.all += 30 - pointsTime - pointsDistance;
          setPoints({...newPoints});
          stats.time += time;
          stats.distance += distance;
          setLettersStats((state) => ({
            ...state,
            [expectedButton.value]: stats,
          }));
          setPosition((state) => state + 1);
          setDistance(0);
        }
        setCount((state) => state + 1);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [buttons, distance, getTimeInterval, isEnd, language, lettersOrder, lettersStats, points, position, setLettersStats, unit]);

  useEffect(() => {
    function handleResize() {
      setUnit(window.innerWidth / 24);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function refreshAll() {
    setPosition(0);
    setCount(0);
    setIsEnd(false);
    setPoints ({
      velocity: 0,
      accuracy: 0,
      all: 0,
    });
    refreshLetters();
    start.func();
  }

  return (
    <div className="App" style={{ "--unit": unit + "px" }}>
      <header className="header"></header>
      <main className="main">
        <Bar
          shifted={shifted}
          setShifted={setShifted}
          numbers={numbers}
          setNumbers={setNumbers}
          language={language === "ru"}
          setLanguage={setLanguage}
          lettersRange={lettersRange}
          setLettersRange={setLettersRange}
          quantity={quantity}
          setQuantity={setQuantity}
          refreshAll={refreshAll}
        />
        <div className="mainContainer">
          <h1 className="headline">Тренажёр печати вслепую</h1>
          <Letters
            lettersOrder={lettersOrder}
            position={position}
            quantity={quantity}
            setIsEnd={setIsEnd}
          />
          <Keyboard
            language={language}
            count={count}
            pressedButton={pressedButton}
            expectedButton={expectedButton}
            unit={unit}
            buttons={buttons}
            setButtons={setButtons}
          />
        </div>
        <StatisticsPanel
          lettersOrder={lettersOrder}
          position={position}
          points={points}
          lettersStats={lettersStats}
        />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
