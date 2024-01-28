import { useState, useRef, useEffect } from "react";

function Canvas({ width, height, setCtx }) {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvas) {
      setCtx(canvas.getContext("2d"));
    }
  }, [canvas, setCtx]);

  return (
    <canvas className="canvas" ref={canvasRef} width={width} height={height} />
  );
}

export default Canvas;
