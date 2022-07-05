import axios from 'axios';

export default class Calculator {
  numClickHandler = (calc, value) => {
    if (this.removeSpaces(calc.num).length < 10) {
      return {
        ...calc,
        num: calc.num === 0 ? Number(calc.num + value) : calc.num + value,
        res: calc.res,
      };
    }

    return calc;
  };

  signClickHandler = async (calc, value) => {
    return {
      ...calc,
      sign: value,
      res: 0,
      num: 0,
    };
  };

  comaClickHandler = (calc, value) => {
    return {
      ...calc,
      num: value,
      sign: '.',
    };
  };

  equalsClickHandler = async (calc) => {
    const res = await this.mathOnRemote(
      Number(calc.res),
      Number(calc.num),
      calc.sign,
    );

    return {
      ...calc,
      res: res,
      sign: '',
      num: 0,
    };
  };

  invertClickHandler = (calc) => {
    return {
      ...calc,
      num: calc.num * -1,
      res: 0,
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

  mathOnRemote = async (a, b, sign) => {
    const data = {
      a,
      b,
      sign,
    };
    return (await axios.post('http://localhost:3001/calc', data)).data.result;
  };
}
