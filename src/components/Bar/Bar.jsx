import "./Bar.css";
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
          childrenleft={"Символы через шифт"}
          childrenRight={""}
        />
        <Counter
          label={"Множитель"}
          value={lettersRange}
          handlePlus={handlePlusLettersRange}
          handleMinus={handleMinusLettersRange}
        />
      </div>
      <button className="refreshAllButton" onClick={refreshAll}>
        Заново
      </button>
    </div>
  );
}

export default Bar;
