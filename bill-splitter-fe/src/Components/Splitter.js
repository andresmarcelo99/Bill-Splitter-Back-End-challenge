import React from "react";
import { Form, Button } from "react-bootstrap";

function Splitter() {
  return (
    <div className="splitter-form-div">
      <Form className="splitter-form">
        <Form.Group controlId="formBasicCost">
          <Form.Label>Bill</Form.Label>
          <Form.Control type="text" placeholder="Enter bill" />
        </Form.Group>

        <Form.Group className="splitter-form-group" controlId="formBasicQty">
          <Form.Label>How many?</Form.Label>
          <Form.Control type="text" placeholder="Add the number of people" />
        </Form.Group>

        <Form.Group className="splitter-form-group" controlId="formBasicTip">
          <Form.Label>Optional Tip?</Form.Label>
          <Form.Control type="text" placeholder="Tip" />
        </Form.Group>
        <div>
          <Button className="split-btn">Split</Button>
        </div>
      </Form>
    </div>
  );
}

export default Splitter;
