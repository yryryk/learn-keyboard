import Loop from "../Loop/Loop"
import { useState, useEffect } from "react";

function Letters({lettersOrder, position, quantity, setIsEnd, isStarted}) {
  const [elements, setElements] = useState([]);
  useEffect(() => {
    if (position && position > lettersOrder.length - 1) {
      setIsEnd(true);
    } else {
      const resultArr = [];
      const halfLength = Math.floor(quantity/2);
      const supplementedLettersOrder = [{value: ''}, {value: ''}, {value: ''}, ...lettersOrder, {value: 'end'}]

      for (let i = 0; i < halfLength; i++) {
        const lettersOrderPosition = i + position;
        if (supplementedLettersOrder.length > lettersOrderPosition) {
          resultArr.push(
            {
              content: supplementedLettersOrder[lettersOrderPosition].value,
              id: (i + position) % quantity,
            }
          );
        } else {
          resultArr.push(
            {
              content: '',
              id: (i + position) % quantity,
            }
          );
        }
      }
      for (let i = halfLength; i < quantity; i++) {
        resultArr.push(
          {
            content: '',
            id: (i + position) % quantity,
          }
        );
      }
      setElements(resultArr);
    }
  }, [lettersOrder, position, quantity, setIsEnd]);
  return (
    <Loop elements={elements} position={position} quantity={quantity} isStarted={isStarted} />
  );
}

export default Letters;
