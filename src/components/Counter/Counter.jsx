import "./Counter.css";

function Counter({ label, value, handlePlus, handleMinus }) {
  return (
    <div className="counterWrapper">
      <button className="counterButton counterButtonTop" onClick={handlePlus}>
        <p className="counterButtonParagraph">+</p>
      </button>
      <div className="counterContainer">
        <p className="counterParagraph">{label}</p>
        <p className="counterParagraph">{value}</p>
      </div>
      <button
        className="counterButton counterButtonBottom"
        onClick={handleMinus}
      >
        <p className="counterButtonParagraph">-</p>
      </button>
    </div>
  );
}

export default Counter;
