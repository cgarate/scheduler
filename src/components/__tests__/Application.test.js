import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
  fireEvent,
  getByText,
  getAllByTestId,
  getByTestId,
  getByAltText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // NOTE: notice getByText is not destructured from the render in this case.
    // Get the root container
    const { container } = render(<Application />);

    // Wait for the API data to load
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const mondayDayListItems = getAllByTestId(container, "day")[0];

    // Get only the first article with appointment data (it is an Empty one)
    const rootAppointmentArticle = getAllByTestId(container, "appointment")[0];

    // Select the icon we need to click on to add an appointment and click on it
    const addIcon = getByTestId(rootAppointmentArticle, "icon-add-appointment");
    fireEvent.click(addIcon);

    // Get the input text box
    const inputStudentName = getByTestId(
      rootAppointmentArticle,
      "student-name-input",
    );

    // Update the input with the student's name
    fireEvent.change(inputStudentName, { target: { value: "Guy Incognito" } });

    // Get the Save button
    const saveButton = getByText(rootAppointmentArticle, "Save");

    // get one of the interviewer's avatars
    const interviewerAvatar = getByAltText(
      rootAppointmentArticle,
      "Sylvia Palmer",
    );

    // Click on the avatar to select the interviewer
    fireEvent.click(interviewerAvatar);

    // Click on the Save button
    fireEvent.click(saveButton);

    // Check that Status is on "Saving"
    expect(getByText(rootAppointmentArticle, "Saving...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      getByText(rootAppointmentArticle, "Saving..."),
    );

    // Check the counter changed
    expect(
      getByText(mondayDayListItems, "no spots remaining"),
    ).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const mondayDayListItems = getAllByTestId(container, "day")[0];

    // Get only the second article with appointment data
    const appointmentToCancel = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

    // Select the icon we need to click on to delete an appointment and click on it
    const cancelIcon = getByAltText(appointmentToCancel, "Delete");
    fireEvent.click(cancelIcon);

    // Get the comfirm button
    const confirmButton = queryByText(appointmentToCancel, "Confirm");
    // Click confirm
    fireEvent.click(confirmButton);

    // Check that Status is on "Deleting"
    expect(getByText(appointmentToCancel, "Deleting...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      queryByText(appointmentToCancel, "Deleting..."),
    );

    // Check if the add button is back
    expect(getByTestId(appointmentToCancel, "icon-add-appointment")).toBeInTheDocument();

    // Check the counter changed
    expect(
      getByText(mondayDayListItems, "2 spots remaining"),
    ).toBeInTheDocument();
  })
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {})
  it("shows the save error when failing to save an appointment", async () => {})
  it("shows the delete error when failing to delete an existing appointment", async () => {})
});
