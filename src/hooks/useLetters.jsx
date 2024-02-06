import { useState, useEffect } from "react";

export default function useLetters({
  letters,
  lettersRange,
  lang,
  isNumbers,
  isShifted,
}) {
  const [lettersOrder, setLettersOrder] = useState([]);
  const [lettersStats, setLettersStats] = useState({});

  function getLetters(data, keys, isNumbers, isShifted) {
    let result = [];
    keys.forEach((item) => {
      if (!isNumbers && item === "numbersLine") return;
      result = result.concat(data[item].native);
      if (isShifted) result = result.concat(data[item].shifted);
    });
    return result;
  }

  function calculate() {
    const data = letters[lang];
    const keys = Object.keys(data);
    const usedLetters = getLetters(data, keys, isNumbers, isShifted);

    const objLettersStats = {};
    usedLetters.forEach((item) => {
      objLettersStats[item.value] = {
        time: 0,
        distance: 0,
        button: item.value,
      };
    });
    setLettersStats(objLettersStats);

    let lettersBand = [];
    for (let i = 0; i < lettersRange; i++) {
      lettersBand = lettersBand.concat(usedLetters);
    }
    const randomLettersOrder = [];
    while (lettersBand.length) {
      const index = Math.floor(Math.random() * lettersBand.length);
      randomLettersOrder.push(lettersBand.splice(index, 1)[0]);
    }
    setLettersOrder(randomLettersOrder);
  }

  useEffect(() => {
    calculate();
  }, [isNumbers, isShifted, lang, letters, lettersRange]);

  return [lettersOrder, lettersStats, setLettersStats, calculate];
}
