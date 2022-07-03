import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import Calculator from "./Calculator";

const calculator = new Calculator();

// https://github.com/testing-library/jest-dom#custom-matchers
// https://testing-library.com/docs/queries/about/
// https://www.w3.org/TR/wai-aria-1.1/#textbox
describe("숫자 입력", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("첫 상태는 0으로 시작해야한다.", () => {
    const resultScreen = screen.getAllByText("0")[0];

    expect(resultScreen.innerHTML).toEqual("0");
  });

  test("숫자 1을 한번 누르면 1로 변경되야한다.", async () => {
    const resultScreen = screen.getByTestId("screen");
    const numberOneButotn = screen.getByTestId("btn1");
    fireEvent.click(numberOneButotn);

    await waitFor(() => expect(resultScreen.firstChild.innerHTML).toEqual("1"));
  });

  test("숫자가 0만 있을 때, 0을 눌러도 변화가 있으면 안된다.", () => {
    const resultScreen = screen.getAllByText("0")[0];
    const numberZeroButotn = screen.getAllByText("0")[1];

    fireEvent.click(numberZeroButotn);

    expect(resultScreen.innerHTML).toEqual("0");
  });

  test("수가 10자리가 넘으면 더 이상 입력되어서는 안된다.", async () => {
    const resultScreen = screen.getByTestId("screen");
    const numberOneButotn = screen.getByTestId("btn1");

    for (let i = 0; i < 20; i++) {
      fireEvent.click(numberOneButotn);
    }

    await waitFor(() =>
      expect(resultScreen.firstChild.innerHTML).toEqual("1111111111")
    );
  });

  test("소수점이 찍히면 소수점 버튼은 disable 되어야한다.", () => {});
  test("숫자판에 숫자가 없을 때, 부호 변경은 disable 되어있어야한다. ", () => {});
  test("숫자판에 숫자가 있을 때, 부호 변경은 enable 되어야한다.", () => {});
  test("부호변경 누르면 수가 양수/음수로 변경되야한다.", () => {});
});

describe("계산", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("=버튼을 누르면 계산하고 그 결과를 출력해야한다", () => {});
  test("숫자가 0일 때, C 버튼을 누르면 dialog에 계산 내역을 보여줘야한다.", () => {});
});
