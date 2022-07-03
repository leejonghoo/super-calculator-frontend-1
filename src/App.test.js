import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Calculator from "./Calculator";

const calculator = new Calculator();

describe("숫자 입력", () => {
  test("첫 상태는 0으로 시작해야한다.", () => {});
  test("숫자가 0만 있을 때, 0을 눌러도 변화가 있으면 안된다.", () => {});
  test("수가 10자리가 넘으면 더 이상 입력되어서는 안된다.", () => {});
  test("소수점이 찍히면 소수점 버튼은 disable 되어야한다.", () => {});
  test("숫자판에 숫자가 없을 때, 부호 변경은 disable 되어있어야한다. ", () => {});
  test("숫자판에 숫자가 있을 때, 부호 변경은 enable 되어야한다.", () => {});
  test("부호변경 누르면 수가 양수/음수로 변경되야한다.", () => {});
});

describe("계산", () => {
  test("=버튼을 누르면 계산하고 그 결과를 출력해야한다", () => {});
  test("숫자가 0일 때, C 버튼을 누르면 dialog에 계산 내역을 보여줘야한다.", () => {});
});
