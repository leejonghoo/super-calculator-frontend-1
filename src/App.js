import React, { useState } from 'react';

import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';
import Calculator from './Calculator';
import PaperDialog from './components/PaperDialog';

const btnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, 'X'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

const calculator = new Calculator();

const App = () => {
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const calculateProxy = async (e, btn) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    switch (btn) {
      case 'C':
        handleOpen();
        return calculator.resetClickHandler(calc);
      case '+-':
        return calculator.invertClickHandler(calc);
      case '%':
        return calculator.percentClickHandler(calc);
      case '=':
        return calculator.equalsClickHandler(calc);
      case '/':
      case 'X':
      case '-':
      case '+':
        return await calculator.signClickHandler(calc, value);
      case '.':
        return calculator.comaClickHandler(calc, value);
      default:
        return await calculator.numClickHandler(calc, value);
    }
  };

  const isCommaButtonDisabled = (btn) => {
    if (btn === '+-' && calc.num === 0) {
      return true;
    }

    if (btn === '.' && calc.sign === '.') {
      return true;
    }

    return false;
  };

  return (
    <div>
      <PaperDialog dialogOpen={dialogOpen} handleClose={handleClose} />
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === '=' ? 'equals' : ''}
                value={btn}
                disabled={isCommaButtonDisabled(btn)}
                onClick={async (e) => {
                  const res = await calculateProxy(e, btn);
                  setCalc(res);
                }}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
};

export default App;
