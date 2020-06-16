import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function BillSetter() {
  return (
    <div className="bill-setter-div">
      <Form>
        <fieldset>
          <Form.Group>
            <Form.Label>Radios</Form.Label>

            <Form.Check
              type="radio"
              label="first radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="second radio"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          </Form.Group>
        </fieldset>
        <Form.Group>
          <Button type="submit">Sign in</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default BillSetter;
