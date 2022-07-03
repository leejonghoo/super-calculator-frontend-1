import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Calculator from "./Calculator";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const calculator = new Calculator();

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const calculateProxy = (e, btn) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    switch (btn) {
      case "C":
        return calculator.resetClickHandler(calc);
      case "+-":
        return calculator.invertClickHandler(calc);
      case "%":
        return calculator.percentClickHandler(calc);
      case "=":
        return calculator.equalsClickHandler(calc);
      case "/":
      case "X":
      case "-":
      case "+":
        return calculator.signClickHandler(calc, value);
      case ".":
        return calculator.comaClickHandler(calc, value);
      default:
        return calculator.numClickHandler(calc, value);
    }
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={(e) => setCalc(calculateProxy(e, btn))}
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
