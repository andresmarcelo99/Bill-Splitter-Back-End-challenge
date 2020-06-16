import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function BillSetter(props) {
  return (
    <div className="bill-setter-div">
      <Form onSubmit={props.onSubmit} className="bill-setter-form">
        <Form.Group controlId="formBasicCost">
          <Form.Label className="splitter-labels">Bill</Form.Label>
          <Form.Control type="text" placeholder="Enter bill" name="bill" />
        </Form.Group>

        <fieldset className="amount-settings">
          <Row>
            <Col>
              <Form.Group>
                <Form.Check
                  className="amount-settings-checks"
                  type="radio"
                  label="Equal Parts"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  onClick={() => props.setTypeAmount(true)}
                />
                <Form.Check
                  className="amount-settings-checks"
                  type="radio"
                  label="Different Amounts"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  onClick={() => props.setTypeAmount(false)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                style={{
                  textAlign: "right",
                  marginRight: "1em",
                  marginTop: "0.4em",
                }}
              >
                <Button
                  className="split-btn"
                  onClick={() => console.log(props.cards)}
                >
                  Split
                </Button>
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group style={{ textAlign: "right" }}> */}

          {/* </Form.Group> */}
        </fieldset>
      </Form>
    </div>
  );
}

export default BillSetter;
