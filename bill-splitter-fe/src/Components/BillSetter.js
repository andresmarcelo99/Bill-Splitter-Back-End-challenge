import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useAuth0 } from "../react-auth0-spa";

function BillSetter(props) {
  const [split, setSplit] = useState(false);
  const { isAuthenticated } = useAuth0();

  const divideBill = () => {
    props.setPendingVal(props.bill);
    console.log(props.cards);

    if (!props.equalAmount) {
      props.setCards([...props.cards]);
      let pending = [...props.cards].filter((card) => card.amount > 0);
      if (pending.length > 0) {
        pending = pending.reduce((a, b) => ({ amount: a.amount + b.amount }));
        const currPending = props.bill - pending.amount;
        props.setPendingVal(currPending);
        console.log(props.pendingVal);
        return setSplit(true);
      }
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
            onChange={(e) => {
              props.setPendingVal(parseInt(e.target.value));
              return props.setBill(parseInt(e.target.value));
            }}
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
                {!isAuthenticated && (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        You need to login to enable features
                      </Tooltip>
                    }
                  >
                    <span className="d-inline-block">
                      <Button
                        style={{ pointerEvents: "none" }}
                        className="split-btn"
                        onClick={divideBill}
                        disabled={!isAuthenticated}
                      >
                        Split
                      </Button>
                    </span>
                  </OverlayTrigger>
                )}
                {isAuthenticated && (
                  <Button className="split-btn" onClick={divideBill}>
                    Split
                  </Button>
                )}
              </Form.Group>
            </Col>
          </Row>
        </fieldset>

        <div>
          {`To cover: ${props.bill}`}
          {!props.equalAmount && `, Left: ${props.pendingVal}`}
        </div>

        {split && props.equalAmount && (
          <div>
            {props.cards.map((card) => (
              <li key={card.id_key}>{`${card.name}, to pay:${
                props.bill / props.cards.length
              }`}</li>
            ))}
          </div>
        )}
        {split && !props.equalAmount && (
          <div>
            {props.cards
              .filter((card) => card.amount > 0)
              .map((card) => (
                <li
                  key={card.id_key}
                >{`${card.name}, amount to pay:${card.amount}`}</li>
              ))}
          </div>
        )}
      </Form>
    </div>
  );
}

export default BillSetter;
