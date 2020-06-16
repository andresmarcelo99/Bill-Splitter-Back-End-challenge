import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

function BillSetter(props) {
  const [split, setSplit] = useState(false);

  const divideBill = () => {
    console.log(props.cards);

    if (!props.equalAmount) {
      console.log("uneven");
      props.setCards([...props.cards]);
      return setSplit(true);
    }
    const toPayEach = props.bill / props.cards.length;
    props.setBillEach(toPayEach);
    return setSplit(true);
  };

  return (
    <div className="bill-setter-div">
      <Form onSubmit={props.onSubmit} className="bill-setter-form">
        <Form.Group controlId="formBasicCost">
          <Form.Label className="splitter-labels">Bill</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bill"
            name="bill"
            onChange={(e) => props.setBill(parseInt(e.target.value))}
          />
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
                  defaultChecked="true"
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
                <Button className="split-btn" onClick={() => divideBill()}>
                  Split
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </fieldset>

        <div>
          {`To cover: ${props.bill}`}
          {!props.equalAmount && `, Left: ${props.bill}`}
        </div>

        {split && props.equalAmount && <div>{props.billEach}</div>}
        {split && !props.equalAmount && (
          <div>
            {props.cards
              .filter((card) => card.amount > 0)
              .map((card) => (
                <li
                  key={card.id_key}
                >{`Name: ${card.name}, Amount:${card.amount}`}</li>
              ))}
          </div>
        )}
      </Form>
    </div>
  );
}

export default BillSetter;
