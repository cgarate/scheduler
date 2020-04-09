import React from "react";
import Button from "components/Button";

const Confirm = ({message, onConfirm, onCancel}) => {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions" data-testid="confirm-section">
        <Button onClick={onCancel} type="danger">Cancel</Button>
        <Button onClick={onConfirm} type="danger">Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;
