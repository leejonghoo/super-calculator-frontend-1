import axios from 'axios';

export default class Calculator {
  numClickHandler = (calc, value) => {
    if (this.removeSpaces(calc.num).length < 16) {
      return {
        ...calc,
        num:
          this.removeSpaces(calc.num) % 1 === 0 &&
          !calc.num.toString().includes('.')
            ? Number(this.removeSpaces(calc.num + value))
            : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      };
    }
  };

  signClickHandler = async (calc, value) => {
    return {
      ...calc,
      sign: value,
      res: !calc.num
        ? calc.res
        : !calc.res
        ? calc.num
        : await this.math(
            Number(this.removeSpaces(calc.res)),
            Number(this.removeSpaces(calc.num)),
            calc.sign,
          ),
      num: 0,
    };
  };

  comaClickHandler = (calc, value) => {
    return {
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num,
    };
  };

  equalsClickHandler = async (calc) => {
    if (calc.sign && calc.num) {
      return {
        ...calc,
        res:
          calc.num === '0' && calc.sign === '/'
            ? "Can't divide with 0"
            : await this.math(
                Number(this.removeSpaces(calc.res)),
                Number(this.removeSpaces(calc.num)),
                calc.sign,
              ),
        sign: '',
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
      num: calc.num ? this.removeSpaces(calc.num) * -1 : 0,
      res: calc.res ? this.removeSpaces(calc.res) * -1 : 0,
      sign: '',
    };
  };

  percentClickHandler = (calc) => {
    let num = calc.num ? parseFloat(this.removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(this.removeSpaces(calc.res)) : 0;
    return {
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: '',
    };
  };

  resetClickHandler = (calc) => {
    return {
      ...calc,
      sign: '',
      num: 0,
      res: 0,
    };
  };

  removeSpaces = (num) => num.toString().replace(/\s/g, '');

  // return await axios.get("calc");
  math = async (a, b, sign) => {
    return sign === '+'
      ? a + b
      : sign === '-'
      ? a - b
      : sign === 'X'
      ? a * b
      : a / b;
    // return (await axios.get("http://localhost:3001/calc")).data;
  };

  mathOnRemote = async (a, b, sign) => {
    const data = {
      a,
      b,
      sign,
    };
    return (await axios.post('http://localhost:3001/calc', data)).data;
  };
}
