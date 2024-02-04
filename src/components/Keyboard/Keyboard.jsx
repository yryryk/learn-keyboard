import Canvas from "../Canvas/Canvas";
import { useState, useEffect } from "react";
import "./Keyboard.css";
import Button from "./canvasElements/button";
import Arrow from "./canvasElements/arrow";
import { letters } from "../../constants/constants";

function Keyboard({ language, count, pressedButton, expectedButton, unit }) {
  const [buttons, setButtons] = useState({});
  const [ctx, setCtx] = useState(null);
  const [defaultOutlineColor, setDefaultOutlineColor] =
    useState("rgb(150, 200, 200)");
  const width = unit * 14.7;
  const height = unit * 4.2;
  const [arrow, setArrow] = useState({});

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
  }, [defaultOutlineColor, language, unit]);

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
    Object.values(buttons).forEach((item) => {
      item.outlineColor = defaultOutlineColor;
      item.isLetterVisible = false;
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
    defaultOutlineColor,
    arrow,
  ]);

  return (
    <div className="keyboard" style={{ "--unit": unit + "px" }}>
      <Canvas width={width} height={height} setCtx={setCtx} />
    </div>
  );
}

export default Keyboard;
