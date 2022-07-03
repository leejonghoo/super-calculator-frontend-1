import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Calculator from "./Calculator";

const calculator = new Calculator();

describe("mockserver test", () => {
  test("test", async () => {
    const res = await calculator.mathOnRemote(1, 2, "+");
    expect(res).toEqual(100);
  });
});

describe("숫자 입력", () => {
  test("a", () => {});
});

describe("계산", () => {
  test("a", () => {});
});
