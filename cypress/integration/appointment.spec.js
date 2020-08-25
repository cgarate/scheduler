/* eslint-disable no-undef */
/**
 * A) "should book an interview"
 *   1. Visits the root of our web server
 *   2. Clicks on the "Add" button in the second appointment
 *   3. Enters their name
 *   4. Chooses an interviewer
 *   5. Clicks the save button
 *   6. Sees the booked appointment
 *
 * B) "should edit an interview"
 *   1. Visits the root of our web server
 *   2. Clicks the edit button for the existing appointment
 *   3. Changes the name and interviewer
 *   4. Clicks the save button
 *   5. Sees the edit to the appointment
 *
 * C) "should cancel an interview"
 *   1. Visits the root of our web server
 *   2. Clicks the delete button for the existing appointment
 *   3. Clicks the confirm button
 *   4. Sees that the appointment slot is empty
 */

const STUDENT_NAME = "Guy Incognito";

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    cy.get("[data-testid=icon-add-appointment]").click();
    cy.get("[data-testid=student-name-input]").type(STUDENT_NAME);
    cy.get("[data-testid=interviewers-list] li:first").click();
    cy.get("[data-testid=save-appointment-button]").click();
    cy.contains(".appointment__card--show", STUDENT_NAME);
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[data-testid=show-student-name]")
      .should("have.text", "Archie Cohen")
      .get("[alt=Edit")
      .click({ force: true })
      .get("[data-testid=student-name-input]")
      .clear()
      .type(STUDENT_NAME);
    cy.get("[data-testid=interviewers-list] li:last").click();
    cy.get("[data-testid=save-appointment-button]").click();
    cy.contains(".appointment__card--show", STUDENT_NAME);
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({ force: true });
    cy.contains("Confirm")
      .click()
    cy.contains("Deleting").should("exist")
    cy.contains("Deleting").should("not.exist")
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
