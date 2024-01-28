import Canvas from "../Canvas/Canvas";
import { useState, useEffect } from "react";
import "./Keyboard.css";
import Button from "./canvasElements/button";
import { letters } from "../../constants/constants";

function Keyboard({ language, position, pressedButton, expectedButton }) {
  const [unit, setUnit] = useState(75);
  const [lettersToKeyCodesMapping, setLettersToKeyCodesMapping] = useState({});
  const [buttons, setButtons] = useState({});
  const [ctx, setCtx] = useState(null);
  const [defaultOutlineColor, setDefaultOutlineColor] = useState("rgb(150, 200, 200)");
  const width = unit * 14.5;
  const height = unit * 4;

  useEffect(() => {
    const lettersKeyCodes = {};
    const buttons = {};
    for (let key in letters.keyCodesMapping) {
      const pressedButtonCodeMapping = letters.keyCodesMapping[key];
      const position = pressedButtonCodeMapping.position;
      const lettersLine = letters[language][pressedButtonCodeMapping.line];
      const shifted = lettersLine.shifted[position];
      const native =
        letters[language][pressedButtonCodeMapping.line].native[position];
      lettersKeyCodes[shifted] = key;
      lettersKeyCodes[native] = key;

      const positionCoefficient = lettersLine.positionCoefficient;
      let positionAddiction = 0;
      switch (positionCoefficient) {
        case 1:
          positionAddiction = 1.5;
          break;
        case 2:
          positionAddiction = 2;
          break;
        case 3:
          positionAddiction = 2.5;
          break;

        default:
          break;
      }

      buttons[key] = new Button({
        x: (position + positionAddiction) * unit,
        y: positionCoefficient * unit,
        height: unit,
        width: unit,
        fontFamily: "monospace",
        fontSize: unit / 4,
        letter: native,
        shiftedLetter: shifted,
        isLetterVisible: false,
        background: "black",
        color: "white",
        outlineColor: defaultOutlineColor,
        gap: 6,
      });
    }
    setLettersToKeyCodesMapping(lettersKeyCodes);
    setButtons(buttons);
  }, [defaultOutlineColor, language, unit]);

  useEffect(() => {
    function draw(ctx) {
      ctx.clearRect(0, 0, width, height);
      for (let key in buttons) {
        buttons[key].drawLowerLayer(ctx);
        buttons[key].drawUpperLayer(ctx);
      }
    }
    const pressed = [lettersToKeyCodesMapping[pressedButton]];
    const expected = [lettersToKeyCodesMapping[expectedButton]];
    if (position) {
      Object.values(buttons).forEach((item) => {
        item.outlineColor = defaultOutlineColor;
        item.isLetterVisible = false;
      });
      buttons[pressed].outlineColor = "#e1771a";
      buttons[pressed].isLetterVisible = true;
      buttons[expected].outlineColor = "#8ee177";
      buttons[expected].isLetterVisible = true;
    }
    if (ctx) draw(ctx);
  }, [
    pressedButton,
    expectedButton,
    lettersToKeyCodesMapping,
    buttons,
    position,
    ctx,
    width,
    height,
    defaultOutlineColor,
  ]);

  return (
    <div className="keyboard" style={{ "--unit": unit + "px" }}>
      <Canvas width={width} height={height} setCtx={setCtx} />
    </div>
  );
}

export default Keyboard;
