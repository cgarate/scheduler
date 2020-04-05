import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

const interviewers = [
  {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png",
  },
];
const studentName = "Lydia Miller-Jones";
const dataTestStudentName = "student-name-input";

afterEach(cleanup);

describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form interviewers={interviewers} />);
  });

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />,
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name={studentName} />,
    );
    expect(getByTestId(dataTestStudentName)).toHaveValue(studentName);
  });

  it("renders a disabled submit button if student name is empty", () => {
    const { getByText } = render(<Form interviewers={interviewers} />);
    expect(getByText("Save").disabled).toEqual(true);
  });

  it("renders a disabled submit button if interviewer is not selected", () => {
    const { getByText } = render(<Form interviewers={interviewers} />);
    expect(getByText("Save").disabled).toEqual(true);
  });

  it("renders an enabled submit button if student name is not empty and interviewer is selected", () => {
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        name={studentName}
        interviewer={interviewers[0].id}
      />,
    );
    expect(getByText("Save").disabled).toEqual(false);
  });

  it("calls onSave when submit button is clicked", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        name={studentName}
        interviewer={interviewers[0].id}
        onSave={onSave}
      />,
    );
    fireEvent.click(getByText("Save"));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(studentName, interviewers[0].id);
  });

  it("submits the name entered by the user, test onChange at the same time", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        interviewer={interviewers[0].id}
      />,
    );

    const input = getByPlaceholderText("Enter Student Name");

    fireEvent.change(input, { target: { value: studentName } });
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0].id);
  });

  it("cancels adding a new appointment", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
        onCancel={onCancel}
        interviewer={interviewers[0].id}
        name={studentName}
      />,
    );

    fireEvent.click(getByText("Cancel"));
    const input = getByPlaceholderText("Enter Student Name");
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("");
  });
});
