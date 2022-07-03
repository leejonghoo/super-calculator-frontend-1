export default class Calculator {
  numClickHandler = (calc, value) => {
    if (this.removeSpaces(calc.num).length < 16) {
      return {
        ...calc,
        num:
          this.removeSpaces(calc.num) % 1 === 0 &&
          !calc.num.toString().includes(".")
            ? this.toLocaleString(Number(this.removeSpaces(calc.num + value)))
            : this.toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      };
    }
  };

  comaClickHandler = (calc, value) => {
    return {
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    };
  };

  signClickHandler = (calc, value) => {
    return {
      ...calc,
      sign: value,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : this.toLocaleString(
            this.math(
              Number(this.removeSpaces(calc.res)),
              Number(this.removeSpaces(calc.num)),
              calc.sign
            )
          ),
      num: 0,
    };
  };

  equalsClickHandler = (calc) => {
    if (calc.sign && calc.num) {
      return {
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : this.toLocaleString(
                this.math(
                  Number(this.removeSpaces(calc.res)),
                  Number(this.removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      };
    }

    return {
      ...calc,
    };
  };

  invertClickHandler = (calc) => {
    return {
      ...calc,
      num: calc.num ? this.toLocaleString(this.removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? this.toLocaleString(this.removeSpaces(calc.res) * -1) : 0,
      sign: "",
    };
  };

  percentClickHandler = (calc) => {
    let num = calc.num ? parseFloat(this.removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(this.removeSpaces(calc.res)) : 0;
    return {
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    };
  };

  resetClickHandler = (calc) => {
    return {
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    };
  };

  toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  removeSpaces = (num) => num.toString().replace(/\s/g, "");

  // return await axios.get("calc");
  math = (a, b, sign) =>
    sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;
}
