import "./SettingsBar.css";
import Switcher from "../Switcher/Switcher";
import Counter from "../Counter/Counter";

function Bar({
  refreshAll,
  shifted,
  setShifted,
  numbers,
  setNumbers,
  language,
  setLanguage,
  lettersRange,
  setLettersRange,
  quantity,
  setQuantity,
}) {
  function handleLanguageSwitch() {
    setLanguage((state) => (state === "eng" ? "ru" : "eng"));
    refreshAll();
  }

  function handleNumbersSwitch() {
    setNumbers((state) => !state);
    refreshAll();
  }

  function handleShiftedSwitch() {
    setShifted((state) => !state);
    refreshAll();
  }

  function handlePlusLettersRange() {
    if (lettersRange < 10) {
      setLettersRange((state) => state + 1);
      refreshAll();
    }
  }

  function handleMinusLettersRange() {
    if (lettersRange > 1) {
      setLettersRange((state) => state - 1);
      refreshAll();
    }
  }

  function handlePlusQuantity() {
    if (quantity < 35) {
      setQuantity((state) => state + 5);
    }
  }

  function handleMinusQuantity() {
    if (quantity > 5) {
      setQuantity((state) => state - 5);
    }
  }
  return (
    <div className="bar">
      <div className="barContainer">
        <h2 className="barHeadline">Настройки</h2>
        <Switcher
          handleSwitch={handleLanguageSwitch}
          checked={language}
          childrenleft={"Eng"}
          childrenRight={"Ru"}
        />
        <Switcher
          handleSwitch={handleNumbersSwitch}
          checked={numbers}
          childrenleft={"Цифры"}
          childrenRight={""}
        />
        <Switcher
          handleSwitch={handleShiftedSwitch}
          checked={shifted}
          childrenleft={"Символы на шифт"}
          childrenRight={""}
        />
        <Counter
          label={"Множитель"}
          value={lettersRange}
          handlePlus={handlePlusLettersRange}
          handleMinus={handleMinusLettersRange}
        />
        <Counter
          label={"Размер"}
          value={(quantity/5 - 1) + 1}
          handlePlus={handlePlusQuantity}
          handleMinus={handleMinusQuantity}
        />
      </div>
      <button className="refreshAllButton" onClick={refreshAll}>
        Заново
      </button>
    </div>
  );
}

export default Bar;
