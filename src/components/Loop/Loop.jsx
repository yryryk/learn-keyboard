import "./Loop.css";
import { useState, useEffect } from "react";
import LoopElement from "./LoopElement/LoopElement";

function Loop({ elements, position, quantity }) {
  const [coefficient, setCoefficient] = useState(0);
  const [loopStyle, setLoopStyle] = useState({});
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    setCoefficient(Math.tan(Math.PI / quantity) * 2);
  }, [quantity]);
  useEffect(() => {
    const loopWrapperWidth = `calc(var(--width)*2.15/${coefficient} + 30px)`;
    const loopContainerPerspective = `calc(var(--width)*3/${coefficient})`;
    setLoopStyle({
      "--loopWrapperWidth": loopWrapperWidth,
      "--loopContainerPerspective": loopContainerPerspective,
    });
  }, [coefficient]);

  function changeAngle(setAngle, quantity, position) {
    if (quantity > 0) {
      setAngle((360 * (position + 3)) / quantity);
    }
  }
  useEffect(() => {
    changeAngle(setAngle, quantity, position);
  }, [position, quantity]);

  return (
    <div className="loopWrapper" style={loopStyle}>
      <div className="loopContainer" style={{ "--angle": "-" + angle + "deg" }}>
        <div className="loopOverlay loopOverlayLeft"></div>
        <div className="loopOverlay loopOverlayRight"></div>
        <div className="loopBorder"></div>
        <div className="loop">
          {elements.map((item) => (
            <LoopElement
              key={item.id}
              element={item}
              id={item.id}
              quantity={quantity}
              coefficient={coefficient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loop;
