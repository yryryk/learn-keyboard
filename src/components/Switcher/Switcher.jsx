import "./Switcher.css";

function Switcher({ handleSwitch, childrenleft, childrenRight, checked }) {
  return (
    <div className={"switcher"}>
      {childrenleft}
      <label className={"checkboxLabel button"}>
        <input
          type="checkbox"
          onChange={handleSwitch}
          className={"checkboxInput"}
          checked={checked}
        />
        <div className={"checkboxSwitcher"}></div>
        <div className={"checkboxInner"}></div>
      </label>
      {childrenRight}
    </div>
  );
}

export default Switcher;
