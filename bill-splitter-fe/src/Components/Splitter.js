import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Splitter(props) {
  const [bill, setBill] = useState(0);
  const [qty, setQty] = useState(0);
  const [tip, setTip] = useState(0);
  const [isValid, setValidation] = useState("");

  const handleSubmit = () => {
    console.log(`bill: ${bill}, qty: ${qty}, tip: ${tip}`);
    const isNum = /^\d+$/.test(bill + qty + tip);
    console.log(isNum);
  };

  return (
    <div className="splits-div-card">
      <Form className="splitter-form">
        <Form.Group controlId="formBasicCost">
          <Form.Label className="splitter-labels">Bill</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bill"
            name="bill"
            onChange={(e) => setBill(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="splitter-form-group" controlId="formBasicQty">
          <Form.Label className="splitter-labels">How many?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add the number of people"
            name="qty"
            onChange={(e) => setQty(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="splitter-form-group" controlId="formBasicTip">
          <Form.Label className="splitter-labels">Optional Tip?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tip"
            name="tip"
            onChange={(e) => setTip(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button className="split-btn" onClick={handleSubmit}>
            Split
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Splitter;
