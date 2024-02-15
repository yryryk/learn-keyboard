import { useState, useEffect } from "react";

export default function useTimeInterval() {
  const [start, setStart] = useState({});
  const [getTimeInterval, setGetTimeInterval] = useState({});

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

  return [start, getTimeInterval];
}
