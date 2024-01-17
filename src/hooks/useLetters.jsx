import { useState, useEffect } from "react";
import { letters } from "../constants/constants";

export default function useLetters({ lettersRange, lang, isNumbers, isShifted }) {
  const [lettersOrder, setLettersOrder] = useState([]);
  const [lettersStats, setLettersStats] = useState({});
  function getLetters(data, keys, lettersRange, isNumbers, isShifted) {
    let result = [];
    keys.forEach((item) => {
      if (!isNumbers && item === 'numbersLine') return;
      result = result.concat(data[item].native);
      if (isShifted) result = result.concat(data[item].shifted);
    });
    return result;
  };
  useEffect (() => {
    const data = letters[lang];
    const keys = Object.keys(data);
    const usedLetters = getLetters(data, keys, isNumbers, isShifted);
    const objLettersStats = {};
    usedLetters.forEach((item) => {
      objLettersStats[item] = {
        time: [],
        button: [],
      }
    });
    setLettersStats(objLettersStats);
    let lettersBand = [];
    for (let i = 0; i < lettersRange; i++) {
      lettersBand = lettersBand.concat(usedLetters);
    }
    const randomLettersOrder = [];
    while (lettersBand.length) {
      const index = Math.floor(Math.random()*lettersBand.length);
      randomLettersOrder.push(lettersBand.splice(index, 1)[0]);
    }
    setLettersOrder(randomLettersOrder);
  }, [isNumbers, isShifted, lang, lettersRange]);

  return [ lettersOrder, lettersStats, setLettersStats ];
}
