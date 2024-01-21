import './Letters.css';
import Loop from "../Loop/Loop"
import { useState, useEffect } from "react";

function Letters({lettersOrder, position, quantity}) {
  const [elements, setElements] = useState([]);
  useEffect(() => {
    const resultArr = [];
    const halfLength = Math.floor(quantity/2);
    const supplementedLettersOrder = ['', '', '', ...lettersOrder]

    for (let i = 0; i < halfLength; i++) {
      const lettersOrderPosition = i + position;
      if (supplementedLettersOrder.length > lettersOrderPosition) {
        resultArr.push(
          {
            content: supplementedLettersOrder[lettersOrderPosition],
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
  }, [lettersOrder, position, quantity]);
  return (
    <Loop elements={elements} position={position} quantity={quantity} />
  );
}

export default Letters;
