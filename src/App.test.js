import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import Calculator from './Calculator';

const calculator = new Calculator();

// https://github.com/testing-library/jest-dom#custom-matchers
// https://testing-library.com/docs/queries/about/
// https://www.w3.org/TR/wai-aria-1.1/#textbox
describe('숫자 입력', () => {
  test('첫 resultScreen 상태는 0으로 시작해야한다.', () => {
    render(<App />);
    // given
    const resultScreen = screen.getByTestId('ResultScreen');

    // then
    expect(resultScreen.textContent).toEqual('0');
  });

  test('숫자 1을 한번 누르면 1로 변경되야한다.', async () => {
    render(<App />);

    // given
    const numberButton = screen.getByText('1');
    const resultScreen = screen.getByTestId('ResultScreen');

    // when
    fireEvent.click(numberButton);

    // then
    await waitFor(() => expect(resultScreen.textContent).toEqual('1'));
  });

  test('숫자가 0만 있을 때, 0을 눌러도 변화가 있으면 안된다.', async () => {
    render(<App />);

    // given
    const numberButton = screen.getAllByText('0');
    const resultScreen = screen.getByTestId('ResultScreen');

    // when
    numberButton.forEach((i) => {
      fireEvent.click(i);
    });

    // then
    await waitFor(() => expect(resultScreen.textContent).toEqual('0'));
  });

  test('수가 10자리가 넘으면 더 이상 입력되어서는 안된다.', async () => {
    // render(<App />);

    // const numberButton = screen.getByText('1');
    // for (let i = 0; i < 20; i++) {
    //   fireEvent.click(numberButton);
    // }

    // const resultScreen = screen.getByTestId('ResultScreen');
    // await new Promise((r) => setTimeout(r, 500));
    // expect(resultScreen.textContent).toHaveLength(10);

    // given
    let calc = { sign: '', num: '0', res: '0' };
    // when
    // then
    for (let i = 0; i < 20; i++) {
      calc = calculator.numClickHandler(calc, '1');
    }

    expect(calc.num).toHaveLength(10);
  });

  test('소수점이 찍히면 소수점 버튼은 disable 되어야한다.', async () => {
    render(<App />);

    // given
    const coma = screen.getByText('.');

    // when
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(coma);
    fireEvent.click(screen.getByText('2'));

    // then
    await waitFor(() => expect(coma).toBeDisabled());
  });

  test('숫자판에 숫자가 없을 때, 부호 변경은 disable 되어있어야한다.', () => {
    render(<App />);

    // given
    const resultScreen = screen.getByTestId('ResultScreen');
    const invertButton = screen.getByText('+-');

    // then
    expect(resultScreen.textContent).toEqual('0');
    expect(invertButton).toBeDisabled();
  });

  test('숫자판에 숫자가 있을 때, 부호 변경은 enable 되어야한다.', async () => {
    render(<App />);

    // given
    const invertButton = screen.getByText('+-');

    // when
    fireEvent.click(screen.getByText('1'));

    // then
    await waitFor(() => expect(invertButton).toBeEnabled());
  });

  test('부호변경 누르면 수가 양수/음수로 변경되야한다.', async () => {
    render(<App />);

    // given
    const resultScreen = screen.getByTestId('ResultScreen');

    // when
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+-'));

    // then
    await waitFor(expect(resultScreen.textContent).toEqual('-1'));
  });
});

describe('계산', () => {
  test('=버튼을 누르면 계산하고 그 결과를 출력해야한다', async () => {
    render(<App />);

    // given
    const resultScreen = screen.getByTestId('ResultScreen');
    const equalButton = screen.getByText('=');

    // when
    fireEvent.click(equalButton);

    // then
    expect(resultScreen).toBeInTheDocument();
    expect(equalButton).toBeInTheDocument();
    await waitFor(() => expect(resultScreen.innerHTML).toContain('100'));
  });

  test('숫자가 0일 때, C 버튼을 누르면 dialog에 계산 내역을 보여줘야한다.', async () => {
    render(<App />);

    // given
    expect(screen.getByTestId('ResultScreen').textContent).toEqual('0');

    // when
    fireEvent.click(screen.getByText('C'));

    // then
    await waitFor(() => expect(screen.getByText('Calculated Records')));
  });
});
