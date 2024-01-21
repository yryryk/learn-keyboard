import "./Loop.css";
import { useState, useEffect } from "react";
import LoopElement from "./LoopElement/LoopElement";

function Loop({ elements, position }) {
  const [quantity, setQuantity] = useState(0);
  const [coefficient, setCoefficient] = useState(0);
  const [loopStyle, setLoopStyle] = useState({});
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    setQuantity(elements.length);
  }, [elements.length]);
  useEffect(() => {
    setCoefficient(Math.tan((Math.PI/quantity))*2);
  }, [quantity]);
  useEffect(() => {
    const loopWrapperWidth = `calc(var(--width)*2.15/${coefficient} + 30px)`;
    const loopContainerPerspective = `calc(var(--width)*3/${coefficient})`;
    setLoopStyle({
      '--loopWrapperWidth': loopWrapperWidth,
      '--loopContainerPerspective': loopContainerPerspective
    });
  }, [coefficient]);

  function changeAngle(setAngle, quantity) {
    if (quantity > 0) {
      setAngle(state => state - 360/quantity);
      setTimeout(() => {
        changeAngle(setAngle, quantity);
      }, 1000);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      changeAngle(setAngle, quantity);
    }, 1000);
  }, [quantity]);

  return (
    <div className="loopWrapper" style={loopStyle}>
      <div className="loopContainer" style={{'--angle': angle + 'deg'}}>
        <div className="loopBorder"></div>
        <div className="loop">
        {elements.map((item) => (<LoopElement key={item.id} element={item} id={item.id} quantity={quantity} coefficient={coefficient}/>))}
        </div>
      </div>
    </div>
  );
}

export default Loop;
