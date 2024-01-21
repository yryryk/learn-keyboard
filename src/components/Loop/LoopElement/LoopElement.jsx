import "./LoopElement.css";
import { useState, useEffect } from "react";

function LoopElement({ element, id, quantity, coefficient }) {
  const [loopElementStyle, setLoopElementStyle] = useState({});
  useEffect(() => {
    setLoopElementStyle({
      transform: `rotateY(${(id)*360/quantity}deg) translateZ(calc(var(--width)/${coefficient}))`
    });
  }, [coefficient, id, quantity]);
  return (
    <div className="elementContainer" style={loopElementStyle}>
      <div className="loopElement">{element.content}</div>
    </div>
  );
}

export default LoopElement;
