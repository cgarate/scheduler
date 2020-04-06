import React from "react";

import { render, cleanup } from "@testing-library/react";

import DayListItem from "components/DayListItem";

afterEach(cleanup);

describe("DayListItem", () => {
  it("renders without crashing", () => {
    render(<DayListItem setDay={setDay} />);
  });

  const setDay = jest.fn();

  it("renders 'no spots remaining' when there are 0 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={0} setDay={setDay} />);
    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("renders '1 spot remaining' when there is 1 spot", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={1} setDay={setDay} />);
    expect(getByText("1 spot remaining")).toBeInTheDocument();
  });

  it("renders '2 spots remaining' when there are 2 spots", () => {
    const { getByText } = render(<DayListItem name="Monday" spots={2} setDay={setDay} />);
    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });
});
