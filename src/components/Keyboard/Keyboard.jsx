import Canvas from "../Canvas/Canvas";
import { useState, useEffect } from "react";
import "./Keyboard.css";
import Button from "./canvasElements/button";
import Arrow from "./canvasElements/arrow";
import { letters } from "../../constants/constants";

function Keyboard({ language, count, pressedButton, expectedButton, unit }) {
  const [buttons, setButtons] = useState({});
  const [ctx, setCtx] = useState(null);
  const width = unit * 14.7;
  const height = unit * 4.2;
  const [arrow, setArrow] = useState({});
  const defaultOutlineColor = "rgb(150, 200, 200)";

  useEffect(() => {
    const buttons = {};
    for (let key in letters.keyCodesToLettersMapping) {
      const pressedButtonCodeMapping = letters.keyCodesToLettersMapping[key];
      const position = pressedButtonCodeMapping.position;
      const lettersLine = letters[language][pressedButtonCodeMapping.line];
      const shifted = lettersLine.shifted[position].value;
      const native = lettersLine.native[position].value;

      const positionCoefficient = lettersLine.positionCoefficient;
      let positionAddiction = 0;
      switch (positionCoefficient) {
        case 1:
          positionAddiction = 1.5;
          break;
        case 2:
          positionAddiction = 1.8;
          break;
        case 3:
          positionAddiction = 2.3;
          break;

        default:
          break;
      }

      buttons[key] = new Button({
        x: Math.floor((position + positionAddiction + 0.1) * unit),
        y: Math.floor((positionCoefficient + 0.1) * unit),
        height: unit,
        width: unit,
        fontFamily: "monospace",
        fontSize: Math.floor(unit / 4),
        letter: native,
        shiftedLetter: shifted,
        isLetterVisible: false,
        background: "black",
        color: "white",
        outlineColor: defaultOutlineColor,
        gap: Math.fround(unit / 10),
      });
    }
    buttons.leftShift = new Button({
      x: Math.floor(0.6 * unit),
      y: Math.floor((3.1) * unit),
      height: unit,
      width: unit * 1.8,
      fontFamily: "monospace",
      fontSize: Math.floor(unit / 4),
      letter: 'Shift ',
      shiftedLetter: '',
      isLetterVisible: true,
      background: "black",
      color: "white",
      outlineColor: defaultOutlineColor,
      gap: Math.fround(unit / 10),
    });
    buttons.rightShift = new Button({
      x: Math.floor((12.4) * unit),
      y: Math.floor((3.1) * unit),
      height: unit,
      width: unit * 1.8,
      fontFamily: "monospace",
      fontSize: Math.floor(unit / 4),
      letter: 'Shift ',
      shiftedLetter: '',
      isLetterVisible: true,
      background: "black",
      color: "white",
      outlineColor: defaultOutlineColor,
      gap: Math.fround(unit / 10),
    });
    setButtons(buttons);
    setArrow(
      new Arrow({
        xStart: 30,
        yStart: 30,
        xEnd: 90,
        yEnd: 90,
        isArrowVisible: false,
        background: "yellow",
        arrowThickness: Math.floor(unit / 5),
        endGap: Math.floor(unit / 4),
      })
    );
  }, [ language, unit]);

  useEffect(() => {
    function draw(ctx) {
      ctx.clearRect(0, 0, width, height);
      for (let key in buttons) {
        buttons[key].drawLowerLayer(ctx);
      }
      arrow.draw(ctx);
      for (let key in buttons) {
        buttons[key].drawUpperLayer(ctx);
      }
    }
    const pressedButtonKey = pressedButton.key;
    const expectedButtonKey = expectedButton.key;
    const pressedButtonShifted = pressedButton.shifted;
    const expectedButtonShifted = expectedButton.shifted;
    Object.values(buttons).forEach((item) => {
      item.outlineColor = defaultOutlineColor;
      if (item.letter !== 'Shift ') item.isLetterVisible = false;
    });
    arrow.isArrowVisible = false;
    if (count) {
      buttons[pressedButtonKey].outlineColor = "#e1771a";
      buttons[pressedButtonKey].isLetterVisible = true;
      buttons[expectedButtonKey].outlineColor = "#8ee177";
      buttons[expectedButtonKey].isLetterVisible = true;
      arrow.xStart =
        buttons[pressedButtonKey].x + buttons[pressedButtonKey].width / 2;
      arrow.yStart =
        buttons[pressedButtonKey].y + buttons[pressedButtonKey].height / 2;
      arrow.xEnd =
        buttons[expectedButtonKey].x + buttons[expectedButtonKey].width / 2;
      arrow.yEnd =
        buttons[expectedButtonKey].y + buttons[expectedButtonKey].height / 2;
      arrow.isArrowVisible = true;
      if(expectedButtonShifted) {
        if(pressedButtonShifted) {
          buttons.leftShift.outlineColor = "#8ee177";
          buttons.rightShift.outlineColor = "#8ee177";
        } else {
          buttons.leftShift.outlineColor = "#e1771a";
          buttons.rightShift.outlineColor = "#e1771a";
        }
      } else {
        if(pressedButtonShifted) {
          buttons.leftShift.outlineColor = "#e1771a";
          buttons.rightShift.outlineColor = "#e1771a";
        }
      }
    }
    if (ctx) draw(ctx);
  }, [
    pressedButton,
    expectedButton,
    buttons,
    count,
    ctx,
    width,
    height,
    arrow,
  ]);

  return (
    <div className="keyboard" style={{ "--unit": unit + "px" }}>
      <Canvas width={width} height={height} setCtx={setCtx} />
    </div>
  );
}

export default Keyboard;
